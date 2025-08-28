"use client"

import { useState } from "react";
import FileUploader from "@/components/fileUploader";
import PredictButton from "@/components/predictButton";
import ResultsBunner from "@/components/resultsBunner";

export default function Service() {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string>("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [probabilities, setProbabilities] = useState<Record<string, number>>({});
  const [inferenceTime, setInferenceTime] = useState<number | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [imageFormat, setImageFormat] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    setPrediction("");
    setConfidence(null);
    setProbabilities({});
    setInferenceTime(null);
    setImageSize({ width: 0, height: 0 });
    setImageFormat("");
  };

  const handlePredict = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/ship-truck", {
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
    } catch (error) {
      console.error("Errore:", error);
      setPrediction("Errore durante la predizione.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-full w-full px-80">
      <div className="flex flex-col justify-center items-center gap-8 w-full">
        <FileUploader onFileChange={handleFileChange} />
        <PredictButton action={handlePredict} />
      </div>
      <div className="flex justify-center items-center h-full w-full">
        <ResultsBunner
          prediction={prediction}
          confidence={confidence}
          item1="ship"
          probabilityItem1={probabilities['ship']}
          item2="truck"
          probabilityItem2={probabilities['truck']}
          inferenceTime={inferenceTime}
          imageHeight={imageSize['height']}
          imageWidth={imageSize['width']}
          imageFormat={imageFormat}
        />
      </div>
    </div>
  );
}
