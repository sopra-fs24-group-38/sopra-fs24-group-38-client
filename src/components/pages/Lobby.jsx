import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import SxyButton from "../ui/SxyButton";
import "../../styles/Hero.scss";

const Lobby = () => {
  const navigate = useNavigate();
  const [sessionToken, setSessionToken] = useState("")
  const demo = () => {
    navigate("/lobby2");
  }
  return(
    <>
      {!sessionToken ?
      <>
        <Header leave />
        <div className="bg-neutral-400" id="hero">
          <div className="bg-neutral-100 w-2/3 h-auto shadow-md rounded-lg">
            {/* TODO: add dynamic username */}
            <h1 className="font-bold text-center m-10 text-2xl">Welcome {localStorage.getItem("username")}</h1>
            <div className="flex flex-col h-1/1 m-20 justify-evenly items-center">
              <SxyButton
                text="Create Lobby"
                color={"#72171D"}
                func={demo}
                width="120px"
              />
              <div className="h-20"></div>
              <SxyButton
                text="Join Lobby"
                color={"#72171D"}
                func={demo}
                width="120px"
              />
            </div>
          </div>
        </div>
      </>
      // session guard
      : <Navigate to={`/game/${sessionToken}`} /> }
    </>
  );
};

export default Lobby;
