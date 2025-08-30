'use client'

import { useState, useEffect } from 'react'
import Keycloak from 'keycloak-js';

export const useKeycloakInstance = () => {
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null);

    const initOptions = {
        url: 'http://localhost:8080/auth/',
        realm: 'master',
        clientId: 'react-client',
    };
    useEffect(() => {
        const kc = new Keycloak(initOptions);
        setKeycloak(kc);
    }, []);

    return keycloak;
};