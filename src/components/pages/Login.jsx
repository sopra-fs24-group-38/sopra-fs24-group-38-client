import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SxyButton from "../ui/SxyButton";
import SxyInput from "../ui/SxyInput";
import { api, handleError } from "../../utils/api";
import Header from "../ui/Header";
import "../../styles/Hero.scss";

const Login = () => {
  const authenticated = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doLoginOrRegister = async () => {
    try {
      const creation_date = new Date();
      const requestBody = JSON.stringify({ username, password });

      let response
      if (isLogin) {
        response = await api.post("/users/login", requestBody);
      } else {
        response = await api.post("/users", requestBody);
      }
      console.log(authenticated.token)
      // Store the token into the local storage.
      authenticated.setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("username", username);

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
      {!localStorage.getItem("token") ? //!authenticated ?
        <>
          <Header />
          <div className="w-full flex  justify-center items-center" id="hero">
            <div className="flex flex-col  shadow-md items-center justify-center login">
              <h1 className="font-bold mb-5 mt-2 text-3xl">{isLogin ? "Login" : "Register"}</h1>
              <SxyInput
                label="Username"
                value={username}
                color={"#ebe4d7"}
                func={(un) => setUsername(un)}
              />
              <SxyInput
                label="Password"
                value={password}
                color={"#ebe4d7"}
                func={(n) => setPassword(n)}
              />
              <div className="flex mb-6 mt-2 justify-between w-80">
                <SxyButton
                  text={isLogin ? "Login" : "Register"}
                  color={"#72171D"}
                  width={"120px"}
                  disabled={!username || !password}
                  func={doLoginOrRegister}
                />

                <SxyButton
                  text={`Go to ${isLogin ? "Register" : "Login"}`}
                  color={"#72171D"}
                  width={"120px"}
                  func={() => setIsLogin(!isLogin)}
                />
              </div>
            </div>
          </div>
        </>
        // Login Guard
        : <Navigate to={"/lobby"} replace />}
    </>
  );
};

export default Login;
