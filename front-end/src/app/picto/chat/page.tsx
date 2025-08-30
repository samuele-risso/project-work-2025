"use client";

import { useState, useEffect, useRef } from "react";
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

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleClearChat = () => {
    setShowIntro(true);
    setMessages([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setShowIntro(false);
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
      const result = await response.json();

      const reply = `
        Prediction: ${result.prediction}
        Confidence: ${result.confidence}%
        Inference time: ${result.inference_time_ms} ms
        Image size: ${result.image_size?.width}x${result.image_size?.height}
        Format: ${result.image_format}
      `;
      setMessages((prev) => [...prev, { role: "bot", type: "text", content: reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "bot", type: "text", content: "Errore durante l'analisi." }]);
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  const modalities = [
    { value: "ship-truck", label: "ship - truck" },
    { value: "cat-dog", label: "cat - dog" },
    { value: "plane-car", label: "plane - car" },
    { value: "bird-deer", label: "bird - deer" },
  ];

  // Scroll automatico verso l'ultimo messaggio
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-black text-white flex flex-col transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {sidebarOpen && <span className="font-semibold text-lg">Menu</span>}
          <button onClick={() => setSidebarOpen((prev) => !prev)} className="p-2 rounded hover:bg-gray-700/70 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-2">
          <button onClick={handleClearChat} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-700/70 transition text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h20v14H6l-4 4V3z" />
              <line x1="6" y1="7" x2="18" y2="7" />
              <line x1="6" y1="11" x2="12" y2="11" />
            </svg>
            {sidebarOpen && <span>New Chat</span>}
          </button>

          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-700/70 transition text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M3 5h18M9 3v2m6-2v2M4 9h16v11H4z" />
            </svg>
            {sidebarOpen && <span>History</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">👤</div>
          {sidebarOpen && (
            <div className="text-sm">
              <p className="font-medium">Logged in</p>
              <p className="text-gray-400 text-xs">user@example.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1 items-center bg-gray-50 relative">
        {/* Schermata iniziale */}
        {showIntro && messages.length === 0 && (
          <div className="flex flex-col justify-center items-center flex-1 min-h-screen">
            <Image src="/picto_logo_p.png" alt="picto_logo" height={170} width={500} />
            <p className="text-center text-blue-600 font-semibold w-md mb-50">
              Choose an image and discover the main subject!
            </p>
          </div>
        )}

        {/* Messaggi */}
        {messages.length > 0 && (
          <div className="flex flex-col flex-1 overflow-y-auto p-4 w-full">
            <div className="flex flex-col gap-4 w-2/4 mx-auto mb-32">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-full p-4 text-sm whitespace-pre-wrap rounded-2xl shadow-sm transition-colors ${msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none shadow-md"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                  }`}>
                    {msg.type === "text" ? (
                      msg.content
                    ) : (
                      <img src={msg.content} alt="uploaded" className="max-w-[200px] rounded-xl shadow-sm" />
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl text-gray-500 text-sm shadow animate-pulse">
                    Analyzing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Input + Modalities */}
        <div className={`flex flex-col items-center w-2/4 transition-all duration-300 ${showIntro && messages.length === 0 ? "absolute bottom-1/4 mb-10 2xl:mb-20" : "absolute bottom-0"}`}>
          <div className="flex flex-row items-center gap-2 w-full mb-2">
            <label htmlFor="file-upload" className="flex flex-1 items-center border border-gray-300 rounded-lg p-2 pl-4 bg-white cursor-pointer text-gray-700 text-center shadow-sm hover:shadow-md transition">
              {file ? file.name : "Upload an image"}
            </label>
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <button onClick={handleSend} disabled={!file || loading} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg transition-shadow shadow-md hover:shadow-lg flex items-center justify-center">
              {loading ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" strokeLinecap="round" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between bg-gray-800 w-full rounded-lg gap-2 p-2 mb-6 shadow-sm">
            {modalities.map((mode) => (
              <button key={mode.label} onClick={() => setSelectedMode(mode.value)} className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-all duration-300 ${selectedMode === mode.value
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}>
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
