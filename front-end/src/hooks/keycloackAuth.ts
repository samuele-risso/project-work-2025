'use client'

import { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

export const useAuth = (kc: Keycloak | null) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (!kc) return;
        kc.init({ 
            onLoad: 'check-sso', 
            checkLoginIframe: true, 
            pkceMethod: 'S256' 
        })
            .then((auth: boolean) => {
                setAuthenticated(auth)
            })
            .catch(console.error);
    }, [kc]);

    return authenticated;
};
