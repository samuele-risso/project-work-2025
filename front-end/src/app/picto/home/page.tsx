

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10 mb-40">
      {/* Logo + testo */}
      <div className="flex flex-col items-center">
        <Image
          src="/picto_logo_p.png"
          alt="picto_logo"
          height={170}
          width={500}
        />
        <p className="text-center text-blue-600 font-bold w-md">
          Picto is an AI that recognizes and identifies the main subject of an image.
        </p>
      </div>

      {/* Bottone */}
      <div className="flex">
        <Link 
        href="/picto/service"
        className="w-full p-3 bg-black text-white font-extrabold rounded hover:bg-gray-900">
          Let's start!
        </Link>
      </div>
    </div>
  );
}
