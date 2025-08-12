"use client"

import { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';

const initOptions = {
  url: 'http://localhost:8080/auth/',
  realm: 'master',
  clientId: 'react-client',
};

export const useKeycloak = () => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const kc = new Keycloak(initOptions);
    kc.init({
      onLoad: 'login-required',
      checkLoginIframe: true,
      pkceMethod: 'S256'
    })
      .then((auth) => {
        setKeycloak(kc);
        setAuthenticated(auth);
      })
      .catch((error) => {
        console.error('Failed to initialize Keycloak', error);
      });
  }, []);

  return { keycloak, authenticated };
};