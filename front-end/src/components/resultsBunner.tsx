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
    return (
        <div className="group relative w-100">
            <div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-[1px] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/25"
            >
                <div
                    className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-blue-500 opacity-20"
                ></div>

                <div
                    className="relative rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-6"
                >
                    {/* <div className="relative">
                        <h3 className="text-4xl tracking-wider text-cyan-500">
                            Results:
                        </h3>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-white">$29</span>
                            <span className="text-sm text-slate-400">/month</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-400">
                            Perfect for growing businesses and professionals.
                        </p>
                    </div> */}

                    <div className="relative mt-6 space-y-4">
                        <div className="flex items-start gap-3">
                            <div
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10"
                            >
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-4 w-4 text-cyan-500"
                                >
                                    <path
                                        d="M5 13l4 4L19 7"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-medium text-white">Prediction:</p>
                                <p className="text-xl text-slate-400">{prediction}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10"
                            >
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-4 w-4 text-cyan-500"
                                >
                                    <path
                                        d="M5 13l4 4L19 7"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-medium text-white">Confidence:</p>
                                <p className="text-xl text-slate-400">{confidence}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10"
                            >
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-4 w-4 text-cyan-500"
                                >
                                    <path
                                        d="M5 13l4 4L19 7"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-medium text-white">Probabilities:</p>
                                <p className="text-xl text-slate-400">{item1} - ({probabilityItem1})</p>
                                <p className="text-xl text-slate-400">{item2} - ({probabilityItem2})</p>

                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10"
                            >
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-4 w-4 text-cyan-500"
                                >
                                    <path
                                        d="M5 13l4 4L19 7"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-medium text-white">Inference Time:</p>
                                <p className="text-xl text-slate-400">{inferenceTime}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10"
                            >
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-4 w-4 text-cyan-500"
                                >
                                    <path
                                        d="M5 13l4 4L19 7"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-medium text-white">Image Size:</p>
                                <p className="text-xl text-slate-400">height - ({imageHeight})</p>
                                <p className="text-xl text-slate-400">width - ({imageWidth})</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10"
                            >
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-4 w-4 text-cyan-500"
                                >
                                    <path
                                        d="M5 13l4 4L19 7"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-medium text-white">Image Format:</p>
                                <p className="text-xl text-slate-400">{imageFormat}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}