from flask import Blueprint, request, jsonify
from PIL import Image
import pytesseract
import io
from langdetect import detect

detection_bp = Blueprint('detection', __name__)

@detection_bp.route('/detection', methods=['POST'])
def detection():
    try:
        if "file" not in request.files:
            return jsonify({"error": "Nessun file inviato"}), 400

        file = request.files["file"]
        img = Image.open(io.BytesIO(file.read()))

        extracted_text = pytesseract.image_to_string(img).strip()

        if not extracted_text:
            return jsonify({"error": "Nessun testo riconosciuto"}), 400

        return jsonify({
            "extracted_text": extracted_text
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500