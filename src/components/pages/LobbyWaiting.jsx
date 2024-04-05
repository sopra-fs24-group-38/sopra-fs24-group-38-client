import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../ui/Header";
import LobbySettings from "../ui/LobbySettings";
import SxyButton from "../ui/SxyButton";
import { api, handleError } from "../../utils/api";
import "../../styles/Hero.scss";
import useFeedback from "../../hooks/useFeedback";

const LobbyWaiting = () => {
  const navigate = useNavigate();
  const feedback = useFeedback()
  const pin = useParams().id;
  const [sessionToken, setSessionToken] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [isGameMaster, setIsGameMaster] = useState(true);

  const [players, setPlayers] = useState([
    { name: "Player 1", features: ["/assets/Ava1.jpg", "Samuel", "+5", "20"] },
    { name: "Player 1", features: ["/assets/Ava1.jpg", "Samuel", "+5", "20"] },
    { name: "Player 1", features: ["/assets/Ava1.jpg", "Samuel", "+5", "20"] },
    { name: "Player 1", features: ["/assets/Ava1.jpg", "Samuel", "+5", "20"] },
    { name: "Player 1", features: ["/assets/Ava1.jpg", "Samuel", "+5", "20"] },
  ]);

  const leaveLobby = async () => {
    try{
      const headers = { "Authorization": localStorage.getItem("token") };
      // const response = api.put("/lobby/users/leave", {}, { headers });

      navigate("/lobby");
    } catch(error){
      feedback.give(handleError(error), 3000, "error");
    }
  }


  return (
    <>
      {!sessionToken ?
        <>
          <Header />
          <div className="bg-neutral-400 flex flex-col relative" id="hero">
            <div className="bg-neutral-100 max-w-sexy p-10 mb-6 shadow-md rounded-lg">
              <h1 className="font-semibold text-center mb-3 text-2xl">PIN: <b>{pin}</b></h1>
              {/* TODO: switch to actual dynamic host name from lobby information */}
              <h1 className="font-semibold text-center text-2xl"><b>{localStorage.getItem("username")}</b> is the host</h1>
              <div className="flex flex-col gap-y-5 mx-4 mt-6 items-center">
                <SxyButton
                  text="Start Game"
                  color={"#72171D"}
                  func={() => {}}
                  disabled={players.length < 2 || !isGameMaster}
                  width="120px"
                />

                {isGameMaster ?
                  <SxyButton
                    text="Settings"
                    color={"#72171D"}
                    func={() => setShowSettings(true)}
                    width="120px"
                  />
                  : null
                }

                <SxyButton
                  text="Leave Lobby"
                  width="120px"
                  color={"#72171D"}
                  func={leaveLobby}
                />
              </div>
            </div>
            <div className="bg-neutral-400 p-8 rounded-lg shadow-md relative" >
              <div id="lobbyplayas">
                {players.length < 2 ? <img alt=""/> : <img src="/assets/Ava2.jpg" alt="player 2" />}
                {players.length < 3 ? <img alt=""/> : <img src="/assets/Ava3.jpg" alt="player 3" />}
                <img src="/assets/Ava1.jpg" alt="player 1" />
                {players.length < 4 ? <img alt=""/> : <img src="/assets/Ava4.jpg" alt="player 4" />}
                {players.length < 5 ? <img alt=""/> : <img src="/assets/Ava5.jpg" alt="player 5" />}
              </div>
              {players.length < 2 ? null : <p className="absolute top-2 left-4 font-bold text-lg z-20">Player 2</p>}
              {players.length < 3 ? null : <p className="absolute top-2 right-4 font-bold text-lg z-20">Player 3</p>}
              <p className="absolute top-48 left-4 font-bold text-lg z-20">Player 1</p>
              {players.length < 4 ? null : <p className="absolute bottom-2 left-4 font-bold text-lg z-20">Player 4</p>}
              {players.length < 5 ? null : <p className="absolute bottom-2 right-4 font-bold text-lg z-20">Player 5</p>}
            </div>

            {showSettings ?
              <LobbySettings out={setShowSettings} />
              : null 
            }
          </div>
        </>
        // session guard
        : <Navigate to={`/game/${pin}`} />}
    </>
  );
};

export default LobbyWaiting;
