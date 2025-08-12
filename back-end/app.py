from flask import Flask, request, jsonify
import torch 
from torchvision.transforms import transforms
from PIL import Image
import io

class Net(torch.nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = torch.nn.Conv2d(3, 6, 5)
        self.pool = torch.nn.MaxPool2d(2, 2)
        self.conv2 = torch.nn.Conv2d(6, 16, 5)
        self.fc1 = torch.nn.Linear(16 * 5 * 5, 128)  # Nota: ho corretto la dimensione del layer
        self.fc2 = torch.nn.Linear(128, 2)
    def forward(self, x):
        x = self.pool(torch.nn.functional.relu(self.conv1(x)))
        x = self.pool(torch.nn.functional.relu(self.conv2(x)))
        x = torch.flatten(x, 1)
        x = torch.nn.functional.relu(self.fc1(x))
        x = self.fc2(x)
        return x
# model = Net().to(device)

app = Flask(__name__)

PATH_1 = '../cat_dog_classifier.pth'
PATH_2 = '../car_airplane_classifier.pth'

try:
    model = Net()
    model.load_state_dict(torch.load(PATH_1))
    model.eval()
except Exception as e:
    exit()


classes = ('cat', 'dog')
transform = transforms.Compose([
    transforms.Resize(32),
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

@app.route('/predict-animals', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "Nessun file inviato"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Nome file non valido"}), 400

    try:
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))
        image_tensor = transform(image).unsqueeze(0)

        with torch.no_grad():
            outputs = model(image_tensor)
            _, predicted = torch.max(outputs.data, 1)

        predicted_class = classes[predicted[0]]
        
        return jsonify({"prediction": predicted_class})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)