import React from "react";
import Link from "next/link";
import Image from "next/image";
import ServiceCard from "@/components/serviceCard";

export default function ReunionHome() {
    const services = [
        {
            title: "Picto",
            description: "Reverse proxy e routing verso i microservizi",
            href: "/picto/chat",
        },
        {
            title: "Detector",
            description: "Conversazioni, notifiche in real-time",
            href: "",
        },
    ];

    return (
        <div>
            {/* Hero */}
            <section className="mx-auto max-w-6xl px-6 pt-14">
                <div className="grid items-center gap-8 md:grid-cols-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Welcome to <span className="underline decoration-gray-300">Reunion</span></h1>
                        <p className="mt-3 text-gray-600">Una home semplice per navigare tra i tuoi microservizi. Plug-and-play: sostituisci gli href con gli endpoint interni o i path di Next.js.</p>
                        <div className="mt-6 flex gap-3">
                            <Link
                                href="#services"
                                className="rounded-2xl bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black"
                            >
                                Vai ai servizi
                            </Link>
                            <Link
                                href="#docs"
                                className="rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                            >
                                Documentazione
                            </Link>
                            <Link
                                href="/support"
                                className="rounded-2xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                            >
                                Contact support
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <Image
                                src="/reunion_logo.png"
                                alt=""
                                width={150}
                                height={273}
                                className='mt-1'
                            />
                            <p className="mt-4 text-sm text-gray-500">
                                Wordmark completamente nero. Sostituibile con una versione SVG personalizzata in qualsiasi momento.
                            </p>
                            <Link
                                href="/brand"
                                className="mt-4 inline-block text-sm font-medium text-gray-900 hover:underline"
                            >
                                Download mobile app →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Microservices Access */}
            <section id="services" className="mx-auto max-w-6xl px-6 py-10 mt-10">
                <div className="mb-6 flex items-end justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Microservices Access</h2>
                        <p className="text-gray-500 text-sm mt-1">Entra nei microservizi disponibili per te.</p>
                    </div>
                    <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Vedi tutti</Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((s) => (
                        <ServiceCard key={s.title} title={s.title} description={s.description} href={s.href} />
                    ))}
                </div>
            </section>
        </div>
    );
}


