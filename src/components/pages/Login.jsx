import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api, handleError } from "../../utils/api";

const Login = () => {
  const authenticated = true;
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doLoginOrRegister = async () => {
    try {
      const creation_date = new Date();
      const requestBody = JSON.stringify({ username, password, creation_date });

      let response
      if (isLogin) {
        response = await api.post("/login", requestBody);
      } else {
        response = await api.post("/register", requestBody);
      }

      // Store the token into the local storage.
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("username", response.data.username);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      navigate("/lobby");
    } catch (error) {
      alert(
        `Something went wrong during the login: \n${handleError(error)}`
      );
    }
  };


  return (
    // TODO: change back to !authenticated
    <>
      {authenticated ?
        <>
          <div>
            
          </div>
        </>
        // Login Guard
        : <Navigate to={"/lobby"} replace />}
    </>
  );
};

export default Login;
