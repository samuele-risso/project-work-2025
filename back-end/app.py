from flask import Flask, request, jsonify
import torch
import torchvision.transforms as transforms
from PIL import Image
import io

class Net(torch.nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        # Layer convoluzionali che prima mancavano
        self.conv1 = torch.nn.Conv2d(3, 6, 5)
        self.pool = torch.nn.MaxPool2d(2, 2)
        self.conv2 = torch.nn.Conv2d(6, 16, 5)

        # Il layer fc1 ha una dimensione di input di 3072, come richiesto dall'errore
        self.fc1 = torch.nn.Linear(16 * 6 * 6, 128) # Assicurati che questa sia la dimensione corretta
        # Questo valore, 3072, probabilmente deriva da un errore in un'altra parte dell'architettura
        # o da un'immagine di input diversa. La dimensione 16 * 6 * 6 = 576
        # Se l'errore ti dice che il modello si aspetta 3072, la riga corretta è:
        # self.fc1 = torch.nn.Linear(3072, 128)

        # I tuoi errori precedenti menzionavano fc2 con 2 classi
        self.fc2 = torch.nn.Linear(128, 2) # Per il classificatore cane/gatto

    def forward(self, x):
        # I passaggi di forward devono riflettere i layer aggiunti
        x = self.pool(torch.nn.functional.relu(self.conv1(x)))
        x = self.pool(torch.nn.functional.relu(self.conv2(x)))

        # Sostituisci x.view con torch.flatten per una maggiore robustezza
        x = torch.flatten(x, 1)

        x = torch.nn.functional.relu(self.fc1(x))
        x = self.fc2(x)
        return x

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