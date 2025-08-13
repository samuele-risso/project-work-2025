"use client"

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKeycloak } from '@/hooks/useKeycloak';

export default function Home() {
    const router = useRouter();
    const { authenticated, userRoles } = useKeycloak();

    useEffect(() => {
        if (authenticated && userRoles.length > 0) {
            if (userRoles.includes('admin')) {
                router.push('/role1');
            } else if (userRoles.includes('pippo')) {
                router.push('/role2');
            } else {
                router.push('/');
            }
        }
    }, [authenticated, userRoles, router]);

    return (
        <div className="flex flex-row justify-center items-center gap-10 h-screen">
            Benvenuto!
        </div>
    );
}
