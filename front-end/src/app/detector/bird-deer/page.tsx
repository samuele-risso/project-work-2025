"use client"

import { useState } from "react";
import FileUploader from "@/components/fileUploader";
import PredictButton from "@/components/predictButton";

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
            const response = await fetch("http://localhost:5000/bird-deer", {
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
        <div className="flex flex-col justify-center items-center h-full w-full p-20">
            <div className="flex flex-col justify-center items-center gap-8 h-full w-full">
                <div className="flex justify-center items-center text-2xl mr-30">
                    <h1>What does the image represent?</h1>
                </div>
                <div className="flex flex-row justify-center items-center gap-8 w-full">
                    <FileUploader onFileChange={handleFileChange} />
                    <PredictButton action={handlePredict} />
                </div>
                <div className="flex justify-center items-center text-2xl text-black mr-30 h-10">
                    <h1>{prediction}</h1>
                </div>
            </div>
        </div>
    );
}