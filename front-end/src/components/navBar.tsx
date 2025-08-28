"use client"

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useKeycloak } from '@/hooks/useKeycloak';

export default function NavBar() {
    const router = useRouter();
    const { authenticated, userRoles, login, logout } = useKeycloak();

    useEffect(() => {
        if (authenticated && userRoles.length > 0) {
            if (userRoles.includes('admin')) {
                router.push('/detector/home');
            } else if (userRoles.includes('pippo')) {
                router.push('/picto/home');
            } else {
                router.push('/');
            }
        }
    }, [authenticated, userRoles, router]);

    return (
        <div className="flex flex-row justify-between h-auto text-white p-2 mx-10">
            <div>
                <Image
                    src="/picto_logo_p.png"
                    alt="picto_logo"
                    height={50}
                    width={130}
                />
            </div>
            <div>
                {authenticated ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-12 bg-white rounded-full p-2 m-2 border-1 border-black"
                    >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                ) : (
                    <div>
                        <button onClick={login}>Login</button>
                    </div>
                )}
            </div>
        </div>
    );
}
