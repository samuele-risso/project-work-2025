from flask import Blueprint, request, jsonify
import torch
from PIL import Image
import io
import torch.nn as nn
import torch.nn.functional as F
import torchvision.transforms as transforms

cat_dog_bp = Blueprint('cat-dog', __name__)

class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.fc1 = nn.Linear(3 * 32 * 32, 128)
        self.fc2 = nn.Linear(128, 2)

    def forward(self, x):
        x = x.view(-1, 3 * 32 * 32)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x

PATH = './models/cat_dog_classifier.pth'
classes = ('cat', 'dog')
transform = transforms.Compose([
    transforms.Resize(32),
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

try:
    model = Net().to(device)
    model.load_state_dict(torch.load(PATH, map_location=device))
    model.eval()
except Exception as e:
    model = None

@cat_dog_bp.route('/cat-dog', methods=['POST'])
def predict():
    if not model:
        return jsonify({"error": "Modello non disponibile"}), 503
        
    if 'file' not in request.files:
        return jsonify({"error": "Nessun file inviato"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Nome file non valido"}), 400

    try:
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        image_tensor = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            outputs = model(image_tensor)
            _, predicted = torch.max(outputs.data, 1)

        predicted_class = classes[predicted[0]]
        return jsonify({"prediction": predicted_class})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    