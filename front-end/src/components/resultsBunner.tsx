export default function ResultsBunner(
    {
        prediction,
        confidence,
        item1,
        probabilityItem1,
        item2,
        probabilityItem2,
        inferenceTime,
        imageHeight,
        imageWidth,
        imageFormat
    }: {
        prediction: string,
        confidence: number | null,
        item1: string,
        probabilityItem1: number | null,
        item2: string,
        probabilityItem2: number | null,
        inferenceTime: number | null,
        imageHeight: number | null,
        imageWidth: number | null,
        imageFormat: string | null,
    }) {
    const displayValue = (value: string | number | null) => value !== null && value !== undefined ? value : "*";

    return (
        <div className="group relative w-full max-w-xl">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-[1px] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/25">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-blue-500 opacity-20"></div>

                <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-6 space-y-4">
                    {/* Prediction */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-cyan-500">
                                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-medium text-white">Prediction:</p>
                            <p className="text-xl text-slate-400 min-h-[1.5rem]">{displayValue(prediction)}</p>
                        </div>
                    </div>

                    {/* Confidence */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-cyan-500">
                                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-medium text-white">Confidence:</p>
                            <p className="text-xl text-slate-400 min-h-[1.5rem]">{displayValue(confidence)}%</p>
                        </div>
                    </div>

                    {/* Probabilities */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-cyan-500">
                                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-medium text-white">Probabilities:</p>
                            <p className="text-xl text-slate-400 min-h-[1.5rem]">{item1}: {displayValue(probabilityItem1)} out of 1</p>
                            <p className="text-xl text-slate-400 min-h-[1.5rem]">{item2}: {displayValue(probabilityItem2)} out of 1</p>
                        </div>
                    </div>

                    {/* Inference Time */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-cyan-500">
                                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-medium text-white">Inference Time:</p>
                            <p className="text-xl text-slate-400 min-h-[1.5rem]">{displayValue(inferenceTime)} ms</p>
                        </div>
                    </div>

                    {/* Image Size */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-cyan-500">
                                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-medium text-white">Image Size:</p>
                            <p className="text-xl text-slate-400 min-h-[1.5rem]">Height: {displayValue(imageHeight)}</p>
                            <p className="text-xl text-slate-400 min-h-[1.5rem]">Width: {displayValue(imageWidth)}</p>
                        </div>
                    </div>

                    {/* Image Format */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-cyan-500">
                                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-medium text-white">Image Format:</p>
                            <p className="text-xl text-slate-400 min-h-[1.5rem]">{displayValue(imageFormat)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
