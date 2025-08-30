import Keycloak from "keycloak-js";

export const useKeycloakActions = (keycloak: Keycloak | null) => {
  const login = () => keycloak?.login({ redirectUri: window.location.origin + '/reunion/home' });
  const logout = () => keycloak?.logout({ redirectUri: window.location.origin + '/reunion/home' });

  return { login, logout };
};
