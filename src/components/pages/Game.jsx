import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import useFeedback from "../../hooks/useFeedback";
import WebSocketContext from "../../context/WebSocketContext";
import { api, handleError } from "../../utils/api";
import Definition from "../game/Definiton";
import Voting from "../game/Voting";


const Game = () => {
  const navigate = useNavigate();
  const feedback = useFeedback()
  const { lastMessage, sendJsonMessage } = useContext(WebSocketContext);
  const [lobby, setLobby] = useState({
    "game_pin": localStorage.getItem("pin"),
    "game_details": {
      "challenge": "",
      "solution": "",
      "players": [],
      "game_state": "LOBBY",
      "game_over": false
    }
  });

  // inital socket establish
  useEffect(() => {
    sendJsonMessage(
      {
        "action": "init",
        "userId": localStorage.getItem("id")
      }
    )
  }, [])
  // check lobby_state
  useEffect(() => {
    // if (lobby.game_details.game_state === "WAITING" || (lastMessage && lastMessage.data === "definitions_finished")) { // Testzweck bei HELLO weiter zu Game 2
    //   navigate(`/lobby/${localStorage.getItem("pin")}`);
    // }
  }, [lobby])
  
  // Use Effect to render new Lobbyinformation
  useEffect(() => {
    console.log("Received message:", lastMessage);
    getLobby();
  }, [lastMessage]);

  const getLobby = async () => {
    try {
      const headers = { "Authorization": localStorage.getItem("token") };
      const response = await api.get(`/lobbies/${localStorage.getItem("pin")}`, { headers });
      setLobby(response.data)

    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
    }
  }

  return (
    <>
      <Header />
      {/* test */}
      {/* {lobby.game_details.game_state === "WAITING" && <Definition lobby={lobby}/>} */}
      {/* {lobby.game_details.game_state === "WAITING" && <Voting lobby={lobby}/>} */}
      {/* {lobby.game_details.game_state === "EVALUATION" && <Score lobby={lobby}/>} */}
      {/* {lobby.game_details.game_state === "GAMEOVER" && <Definition lobby={lobby}/>} */}


      {/* Produktiv */}
      {lobby.game_details.game_state === "DEFINITION" && <Definition lobby={lobby}/>}
      {lobby.game_details.game_state === "VOTE" && <Voting lobby={lobby}/>}
      {lobby.game_details.game_state === "EVALUATION" && <Definition lobby={lobby}/>}
      {lobby.game_details.game_state === "GAMEOVER" && <Definition lobby={lobby}/>}


    </>
  );
};

export default Game;
