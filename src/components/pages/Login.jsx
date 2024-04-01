import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SxyButton from "../ui/SxyButton";
import SxyInput from "../ui/SxyInput";
import { api, handleError } from "../../utils/api";
import Header from "../ui/Header";
import useFeedback from "../../hooks/useFeedback";
import "../../styles/Hero.scss";

const Login = () => {
  const navigate = useNavigate();
  const feedback = useFeedback();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const doLoginOrRegister = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });

      let response;
      if (isLogin) {
        response = await api.post("/users/login", requestBody);
      } else {
        response = await api.post("/users", requestBody);
      }

      // Store the token into the local storage.
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("username", username);

      feedback.give(`Welcome ${localStorage.getItem("username")}`, 2000, "info");
      navigate("/lobby");
    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
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
                  enterKey={doLoginOrRegister}
                />
                {passwordType ?
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  className="absolute aspect-square w-6 cursor-pointer -right-8 top-1/2 -translate-y-1/4" onClick={() => setPasswordType((prev) => !prev)}>
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle>
                    </g>
                  </svg>
                  : 
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute aspect-square w-6 cursor-pointer -right-8 top-1/2 -translate-y-1/4" onClick={() => setPasswordType((prev) => !prev)}>
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M2 2L22 22" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </g>
                  </svg>
                }
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
