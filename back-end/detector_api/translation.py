from flask import Flask, request, jsonify, Blueprint
from PIL import Image
from langdetect import detect
from googletrans import Translator

translation_bp = Blueprint('translation', __name__)
translator = Translator()

@translation_bp.route('/translation', methods=['POST'])
def translation():
    try:
        data = request.get_json()

        if not data or "text" not in data:
            return jsonify({"error": "Parametro 'text' mancante"}), 400

        text = data["text"]
        target_lang = data.get("target_lang", "en")

        detected_lang = detect(text)

        translation = translator.translate(text, src=detected_lang, dest=target_lang)

        return jsonify({
            "original_text": text,
            "detected_language": detected_lang,
            "target_language": target_lang,
            "translated_text": translation.text
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500