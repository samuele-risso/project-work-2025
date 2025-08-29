"use client"

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useKeycloak } from '@/hooks/useKeycloak';
import UserDropdown from './userDropdown';

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
                {/* <Image
                    src="/picto_logo_p.png"
                    alt="picto_logo"
                    height={50}
                    width={130}
                /> */}
            </div>
            <div>
                {authenticated ? (
                    <UserDropdown logOut={logout}/>
                ) : (
                    <div>
                        <button onClick={login} className='text-black'>Login</button>
                    </div>
                )}
            </div>
        </div>
    );
}
