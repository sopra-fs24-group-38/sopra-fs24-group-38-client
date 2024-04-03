import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../ui/Header";
import LobbySettings from "../ui/LobbySettings";
import SxyButton from "../ui/SxyButton";
import "../../styles/Hero.scss";

const LobbyWaiting = () => {
  const navigate = useNavigate();
  const pin = useParams().id;
  const [sessionToken, setSessionToken] = useState("");
  const [showSettings, setShowSettings] = useState(false);
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
          <div className="bg-neutral-400 flex flex-col" id="hero">
            <div className="bg-neutral-100 max-w-sexy p-10 mb-10 shadow-md rounded-lg">
              <h1 className="font-semibold text-center mb-3 text-2xl">PIN: <b>{pin}</b></h1>
              <h1 className="font-semibold text-center text-2xl"><b>{localStorage.getItem("username")}</b> is the host</h1>
              <div className="flex flex-col h-36 m-4 justify-evenly items-center">
                <SxyButton
                  text="Start Game"
                  color={"#72171D"}
                  func={() => {}}
                  disabled={players.length < 1 && isGameMaster}
                  width="120px"
                />
                <SxyButton
                  text="Settings"
                  color={"#72171D"}
                  func={() => setShowSettings(true)}
                  width="120px"
                />
              </div>
            </div>
            <div className="bg-neutral-400 w-96 h-96 grid grid-cols-3 gap-4 content-center rounded-lg shadow-md" >

            </div>
          </div>
          {showSettings ?
            <LobbySettings />
            : null 
          }
        </>
        // session guard
        : <Navigate to={`/game/${sessionToken}`} />}
    </>
  );
};

export default LobbyWaiting;
