"use client";

import { useState } from "react";
import Image from "next/image";

interface Message {
  role: "user" | "bot";
  type: "text" | "image";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedMode, setSelectedMode] = useState<string>("ship-truck");
  const [prediction, setPrediction] = useState<string>("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [probabilities, setProbabilities] = useState<Record<string, number>>({});
  const [inferenceTime, setInferenceTime] = useState<number | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [imageFormat, setImageFormat] = useState<string>("");

  const modes = [
    { label: "ship - truck", value: "ship-truck", icon: "1" },
    { label: "cat - dog", value: "cat-dog", icon: "2" },
    { label: "plane - car", value: "plane-car", icon: "3" },
    { label: "bird - deer", value: "bird-deer", icon: "4" },
  ];

  const handleClearChat = () => {
    setShowIntro(true)
    setMessages([])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setShowIntro(false);

      setPrediction("");
      setConfidence(null);
      setProbabilities({});
      setInferenceTime(null);
      setImageSize({ width: 0, height: 0 });
      setImageFormat("");
    }
  };

  const handleSend = async () => {
    if (!file) return;

    const imgURL = URL.createObjectURL(file);
    setMessages((prev) => [...prev, { role: "user", type: "image", content: imgURL }]);

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://localhost:8000/api/${selectedMode}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Errore durante la predizione dall'API.");
      }

      const result = await response.json();

      setPrediction(result.prediction);
      setConfidence(result.confidence);
      setProbabilities(result.probabilities);
      setInferenceTime(result.inference_time_ms);
      setImageSize(result.image_size);
      setImageFormat(result.image_format);

      const reply = `
        Prediction: ${result.prediction}
        Confidence: ${result.confidence}%
        Inference time: ${result.inference_time_ms} ms
        Image size: ${result.image_size?.width}x${result.image_size?.height}
        Format: ${result.image_format}
      `;

      setMessages((prev) => [...prev, { role: "bot", type: "text", content: reply }]);
    } catch (error) {
      console.error("Errore:", error);
      setPrediction("Errore durante la predizione.");
      setMessages((prev) => [
        ...prev,
        { role: "bot", type: "text", content: "Errore durante l'analisi." },
      ]);
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"
          } bg-gray-900 text-white flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {sidebarOpen}
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="text-gray-400 hover:text-white"
          >
            ☰
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div>
            <button
              onClick={handleClearChat}
              className="block p-2 rounded hover:bg-gray-800 transition text-xl"
            >
              {sidebarOpen ? "New Chat" : <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <path d="M2 3h20v14H6l-4 4V3z" />
                <line x1="6" y1="7" x2="18" y2="7" />
                <line x1="6" y1="11" x2="12" y2="11" />
              </svg>}
            </button>
          </div>

          <div>
            {sidebarOpen ? <h1 className="ml-2 text-xl">Modalities:</h1> : ""}
            <ul>
              {modes.map((mode) => (
                <li className="mx-4" key={mode.value}>
                  <button
                    onClick={() => setSelectedMode(mode.value)}
                    className={`block w-full text-start p-2 rounded hover:bg-gray-800 transition 
                      ${selectedMode === mode.value ? "bg-gray-700" : ""}`}
                  >
                    {sidebarOpen ? mode.label : mode.icon}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button className="block p-2 rounded hover:bg-gray-800 transition">
              {sidebarOpen ? "History" : "📜"}
            </button>
          </div>

        </nav>

        <div className="p-4 border-t border-gray-700">
          {sidebarOpen ? "Logged in" : "👤"}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1 items-center bg-gray-100 relative">
        {/* Schermata introduttiva */}
        {showIntro && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 mb-30">
            <Image src="/picto_logo_p.png" alt="picto_logo" height={170} width={500} />
            <p className="text-center text-blue-600 font-bold w-md mt-4">
              Choose an image and discover the main subject!
            </p>
          </div>
        )}

        {/* Messaggi */}
        {messages.length > 0 && (
          <div className="flex flex-col flex-1 overflow-y-auto p-4 w-full">
            <div className="flex flex-col gap-4 w-2/4 mx-auto mb-20">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-full p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white border text-gray-800 rounded-bl-none"
                      }`}
                  >
                    {msg.type === "text" ? (
                      msg.content
                    ) : (
                      <img src={msg.content} alt="uploaded" className="max-w-[200px] rounded-xl" />
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border p-3 rounded-2xl text-gray-500 text-sm">
                    Analyzing...
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Input */}
        <div
          className={`flex flex-row items-center gap-2 w-2/4 pb-8 bg-gray-100 transition-all duration-300 ${showIntro && messages.length === 0 ? "absolute bottom-1/3" : "absolute bottom-0"
            }`}
        >
          <label
            htmlFor="file-upload"
            className="flex flex-1 items-start border rounded-lg p-2 pl-4 bg-white cursor-pointer text-gray-700 text-center"
          >
            {file ? file.name : "Upload an image"} {/* testo personalizzato */}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden" // nasconde il default "No file chosen"
          />
          <button
            onClick={handleSend}
            disabled={!file || loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-black text-white px-4 py-2 rounded-lg border h-full"
          >
            {loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 animate-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="4" y="4" width="16" height="16" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
