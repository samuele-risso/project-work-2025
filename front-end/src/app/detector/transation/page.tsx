'use client'

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("en");
  const [loading, setLoading] = useState(false);

  const handleUpload = (e: any) => {
    const selected = e.target.files[0];
    setFile(selected);
    setText("");
    setTranslated("");
    setSourceLang("");
  };

  const handleTranslate = async () => {
    if (!file) return alert("Carica un'immagine!");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("target_lang", targetLang);

    try {
      const res = await fetch("http://localhost:8000/ocr_translate/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setText(data.original_text);
      setSourceLang(data.source_language);
      setTranslated(data.translated_text);
    } catch (err) {
      console.error(err);
      alert("Errore durante l'elaborazione");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">TextTransOCR</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        Riconosci e traduci testo dalle immagini in qualsiasi lingua. Carica un'immagine e lascia che il nostro motore OCR faccia il lavoro per te.
      </p>

      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Carica la tua immagine</h2>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 hover:border-blue-400 transition w-full cursor-pointer">
          {preview ? (
            <img src={preview} alt="preview" className="max-h-48 rounded mb-2" />
          ) : (
            <p className="text-gray-400 mb-2">Trascina qui l'immagine o clicca il bottone sotto</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="border p-2 rounded bg-blue-100 hover:bg-blue-200 transition cursor-pointer"
          />
        </div>

        <div className="mt-2 flex gap-3 items-center">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="en">Inglese</option>
            <option value="it">Italiano</option>
            <option value="es">Spagnolo</option>
            <option value="fr">Francese</option>
            <option value="de">Tedesco</option>
          </select>
          <button
            onClick={handleTranslate}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition flex items-center"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}
            Traduci
          </button>
        </div>
      </div>

      {text && (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">Testo Riconosciuto ({sourceLang})</h2>
          <textarea
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={text}
            readOnly
            rows={4}
          />
        </div>
      )}

      {translated && (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">Testo Tradotto ({targetLang})</h2>
          <textarea
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={translated}
            readOnly
            rows={4}
          />
          <button
            onClick={() => navigator.clipboard.writeText(translated)}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Copia negli Appunti
          </button>
        </div>
      )}

      <footer className="text-gray-500 mt-10">
        Powered by <strong>Tesseract OCR</strong> & <strong>Google Translate API</strong>
      </footer>
    </div>
  );
}
