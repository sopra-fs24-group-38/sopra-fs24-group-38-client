import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import SxyButton from "../ui/SxyButton";
import "../../styles/Hero.scss";

const LobbyWaiting = () => {
  const navigate = useNavigate();
  const [sessionToken, setSessionToken] = useState("");
  const [show, setShow] = useState(0);
  const [isGameMaster, setIsGameMaster] = useState(false);

  const [players, setPlayers] = useState([
    { name: "Player 1", features: ["/assets/Ava1.jpg", "Samuel", "+5", "20"] },
    { name: "Player 2", features: ["/assets/Ava2.jpg", "Elia", "+2", "18"] },
  ]);


  return (
    <>
      {!sessionToken ?
        <>
          <Header leave />
          <div className="bg-neutral-400" id="hero">
            <div className="bg-neutral-100 max-w-sexy h-auto shadow-md rounded-lg">
              <h1 className="font-bold text-center m-10 text-2xl">Game master is {localStorage.getItem("username")}</h1>
              <div className="flex flex-col h-1/1 m-20 justify-evenly items-center">
                <SxyButton
                  text="Start Game"
                  color={"#72171D"}
                  func={() => {}}
                  disabled={players.length < 1 && !isGameMaster}
                  width="120px"
                />
                <div className="h-20"></div>
                <SxyButton
                  text="Settings"
                  color={"#72171D"}
                  func={() =>{}}
                  width="120px"
                />
              </div>
              <div className="w-full grid grid-cols-3 gap-4 content-center " >

              </div>
            </div>
          </div>
        </>
        // session guard
        : <Navigate to={`/game/${sessionToken}`} />}
    </>
  );
};

export default LobbyWaiting;
