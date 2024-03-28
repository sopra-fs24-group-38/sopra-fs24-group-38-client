import React from "react";

const AuthContext = React.createContext({
  token: "",
  setToken: () => {},
});

export default AuthContext;
