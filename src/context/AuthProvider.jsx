import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({children}) => {
  const [loginToken, setLoginToken] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  return(
    <AuthContext.Provider value={{loginToken, setLoginToken, sessionToken, setSessionToken}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
