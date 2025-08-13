import React from 'react';

export default function NavBar() {
    return (
        <div className="flex flex-row items-center bg-black w-full h-auto text-white p-4">
            <div className="flex justify-start items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-10 bg-white rounded-full p-1"
                >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>
            <div className="flex justify-end">
            </div>
        </div>
    );
}