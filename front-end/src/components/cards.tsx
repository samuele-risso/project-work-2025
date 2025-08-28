import Image from "next/image"
import Link from "next/link"

export default function Cards({ t1, t2, img, link }: { t1: string, t2: string, img: string, link: string }) {
    return (
        <div className="flex flex-col bg-white rounded-3xl">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div>
                        <h2
                            className="text-lg font-medium tracking-tighter text-black lg:text-5xl"
                        >
                            {t1}
                        </h2>
                        <p className="mt-2 text-lg text-gray-500">{t2}</p>
                    </div>
                    <Image
                        src={img}
                        alt={t1} 
                        width={300} 
                        height={300}
                        className="mt-6 border-2 border-black"
                    />
                </div>
            </div>
            <div className="flex px-6 pb-8 sm:px-8">
                <Link
                    aria-describedby="tier-company"
                    className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-md focus-visible:ring-black"
                    href={link}
                >
                    Recognise Image
                </Link>
            </div>
        </div>

    )
}