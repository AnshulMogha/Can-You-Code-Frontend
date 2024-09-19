import { createContext, useContext } from "react";

import useAuthentication from "../Hooks/useAuthentication";
const AuthContext = createContext();
const AuthProvider = function ({ children }) {
  const query = useAuthentication();
  return <AuthContext.Provider value={query}>{children}</AuthContext.Provider>;
};
const useAuthContext = function () {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
