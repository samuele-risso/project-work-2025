"use client"
import React, { useState } from 'react';

export default function FileUploader() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Usa l'optional chaining per sicurezza
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        } else {
            setSelectedImage(null);
            alert("Per favore, seleziona un file immagine.");
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        } else {
            setSelectedImage(null);
            alert("Per favore, rilascia un file immagine.");
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div className="w-full rounded-lg overflow-hidden md:max-w-xl">
            <div className="md:flex">
                <div className="w-full p-3">
                    <div
                        className="relative h-72 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="Uploaded Preview"
                                className="object-cover w-full h-full rounded-lg"
                            />
                        ) : (
                            <div className="absolute flex flex-col items-center">
                                <img
                                    alt="File Icon"
                                    className="mb-3"
                                    src="https://img.icons8.com/dusk/64/000000/file.png"
                                />
                                <span className="block text-gray-500 font-semibold">
                                    Drag &amp; drop your files here
                                </span>
                                <span className="block text-gray-400 font-normal mt-1">
                                    or click to upload
                                </span>
                            </div>
                        )}

                        <input
                            name="file-upload"
                            className="h-full w-full opacity-0 cursor-pointer absolute top-0 left-0"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}