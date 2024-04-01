import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import AuthContext from "../../context/AuthContext";
import SxyButton from "../ui/SxyButton";
import SxyInput from "../ui/SxyInput";
import { api, handleError } from "../../utils/api";
import Header from "../ui/Header";
import "../../styles/Hero.scss";

const Login = () => {
  const showPassword = "/assets/eye-password-show.svg";
  const hidePassword = "/assets/eye-password-hide.svg";
  // const authenticated = useContext(AuthContext);

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const doLoginOrRegister = async () => {
    try {
      // const creation_date = new Date();
      const requestBody = JSON.stringify({ username, password });

      let response
      if (isLogin) {
        response = await api.post("/users/login", requestBody);
      } else {
        response = await api.post("/users", requestBody);
      }

      // Store the token into the local storage.
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("username", username);

      navigate("/lobby");
    } catch (error) {
      alert(
        `Something went wrong during the login: \n${handleError(error)}`
      );
    }
  };

  return (
    <>
      {!localStorage.getItem("token") ?
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
              <div className="relative">
                <SxyInput
                  label="Password"
                  value={password}
                  color={"#ebe4d7"}
                  type={passwordType ? "password" : "text"}
                  func={(n) => setPassword(n)}
                />
                {passwordType ?
                  <img src={showPassword} alt="Show" className="absolute aspect-square w-6 cursor-pointer -right-7 top-1/2 -translate-y-1/4" onClick={() => setPasswordType((prev) => !prev)}/>
                  : <img src={hidePassword} alt="Hide" className="absolute aspect-square w-6 cursor-pointer -right-7 top-1/2 -translate-y-1/4" onClick={() => setPasswordType((prev) => !prev)}/> }
              </div>
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
