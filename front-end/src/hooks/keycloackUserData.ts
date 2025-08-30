'use client'

import { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

export const useUserData = (kc: Keycloak | null, auth: boolean) => {
    const [userData, setUserData] = useState<{
        roles: string[] | [],
        username: string,
        email: string,
        fullName: string,
        userId: string
    }>({
        roles: [],
        username: '',
        email: '',
        fullName: '',
        userId: ''
    });

    useEffect(() => {
        if (!kc?.tokenParsed || !auth) return;

        setUserData({
            userId: kc?.tokenParsed?.sub ?? '',
            fullName: kc?.tokenParsed?.name ?? '',
            username: kc?.tokenParsed?.preferred_username ?? '',
            email: kc?.tokenParsed?.email ?? '',
            roles: kc?.tokenParsed?.realm_access?.roles ?? [],
        });
    }, [kc, auth]);

    return userData;
};
