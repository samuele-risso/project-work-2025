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
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    const kc = new Keycloak(initOptions);
    kc.init({
      onLoad: 'check-sso',
      checkLoginIframe: true,
      pkceMethod: 'S256'
    })
      .then((auth) => {
        setKeycloak(kc);
        setAuthenticated(auth);
        if (auth && kc.tokenParsed) {
          const roles = kc.tokenParsed.realm_access?.roles || [];
          setUserRoles(roles);
        }
      })
      .catch((error) => {
        console.error('Failed to initialize Keycloak', error);
      });
  }, []);

  const login = () => keycloak?.login();
  const logout = () => keycloak?.logout({ redirectUri: window.location.origin + '/' });

  return { keycloak, authenticated, userRoles, login, logout };
};
