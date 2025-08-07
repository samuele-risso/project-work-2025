"use client"

import { useState } from "react";
import Button from "@/components/button";
import FileUploader from "@/components/fileUploader";

export default function Animali() {
    const [file, setFile] = useState<File | null>(null);
    const [prediction, setPrediction] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (selectedFile: File) => {
        setFile(selectedFile);
        setPrediction("");
    };

    const handlePredict = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5000/predict-animals", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Errore durante la predizione dall'API.");
            }

            const result = await response.json();
            setPrediction(result.prediction);
        } catch (error) {
            console.error("Errore:", error);
            setPrediction("Errore durante la predizione.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col p-10 gap-25">
            <div className="flex justify-start items-start">
                <Button onClick={handlePredict} />
            </div>
            <div className="flex flex-col justify-center items-center gap-6 h-full">
                <h1 className="text-white text-center text-8xl mb-16">Cane o Gatto?</h1>
                <FileUploader onFileChange={handleFileChange} />
                {loading && <p className="text-white text-3xl">Caricamento...</p>}
                {prediction && (
                    <h1 className="text-green-500 text-5xl">{prediction}</h1>
                )}
            </div>
        </div>
    );
}