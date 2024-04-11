import React, { createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [loginToken, setLoginToken] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  return(
    <AuthContext.Provider value={{loginToken, setLoginToken, sessionToken, setSessionToken}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
