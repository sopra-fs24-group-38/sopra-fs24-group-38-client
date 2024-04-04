import React from "react";

const AuthContext = React.createContext({
  loginToken: "",
  setLoginToken: () => {},
  sessionToken: "",
  setSessionToken: () => {},
});

export default AuthContext;
