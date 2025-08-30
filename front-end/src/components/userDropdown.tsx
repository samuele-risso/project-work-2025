"use client";

import { useState } from "react";
import Link from "next/link";

export default function UserDropdown(
  {
    logOut
  }: {
    logOut: () => Promise<void> | undefined
  }
) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Trigger SVG */}
      <button onClick={toggleDropdown} className="focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-10 bg-white border-l-1 border-gray-700 pl-4"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-0 left-full ml-2 bg-trasparent z-50 flex flex-row">
          <div className="flex flex-row gap-5 px-2">
            {/* Impostazioni */}
            <Link
              href=""
              className="flex justify-end items-center w-full py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-full"
            >
              <svg
                className="w-6 h-6 text-gray-500 shadow-lg rounded-full"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                />
              </svg>
            </Link>

            {/* Profilo */}
            <Link
              href="/reunion/profile"
              className="flex justify-end items-center w-full py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-full"
            >
              <svg
                className="w-7 h-7 text-gray-500  shadow-md rounded-full"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A9 9 0 0 1 12 15a9 9 0 0 1 6.879 2.804M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                />
              </svg>
            </Link>

            {/* Logout */}
            <button
              onClick={logOut}
              className="flex justify-end items-center w-full py-2 text-sm text-red-600 hover:bg-red-100 hover:rounded-full"
            >
              <svg
                className="w-7 h-7 text-red-600  shadow-md rounded-full"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
