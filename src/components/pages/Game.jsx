import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import Information from "../game/Information";
import useFeedback from "../../hooks/useFeedback";

import { toast } from "react-toastify";
import WebSocketContext from "../../context/WebSocketContext";
import { api, handleError } from "../../utils/api";
import Definition from "../game/Definiton";
import Voting from "../game/Voting";
import Score from "../game/Score";
import AnswerOutcome from "../game/AnswerOutcome";
import AnswerFooled from "../game/AnswerFooled";


const Game = () => {
  const navigate = useNavigate();
  const feedback = useFeedback()
  const { lastMessage, sendJsonMessage } = useContext(WebSocketContext);
  const prep = useRef(null);
  const [gameState, setGameState] = useState("");
  const [solution, setSolution] = useState(false);
  const [fooler, setFooler] = useState({ mode: false, player: { username: "", avatarId: 0 } });
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
    // setFooler({mode: false, player: {username:"", avatarId:0}})
  }, [])

  // check lobby_state
  useEffect(() => {
    if (lobby.game_details.game_state === "WAITING") {
      navigate(`/lobby/${localStorage.getItem("pin")}`);
    }
    if (lobby.game_details.game_state === "DEFINITION") {

      toast.dismiss()
      setGameState("DEFINITION")
    }
    if (lobby.game_details.game_state === "VOTE") {
      setGameState("VOTE")
    }
    if (lobby.game_details.game_state === "EVALUATION") {
      if (gameState === "VOTE") {
        handleOutcome()
      } else {
        setGameState("SCORE");
      }
    }
    if (lobby.game_details.game_state === "GAMEOVER") {
      navigate("/game/end");
    }
  }, [lobby])

  // Use Effect to render new Lobbyinformation
  useEffect(() => {
    console.log("Received message:", lastMessage);
    getLobby();
  }, [lastMessage,]);

  const getLobby = async () => {
    try {
      const headers = { "Authorization": localStorage.getItem("token") };
      const response = await api.get(`/lobbies/${localStorage.getItem("pin")}`, { headers });
      setLobby(response.data)

    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
    }
  }

  const handleOutcome = () => {
    const tempPlayer = lobby.game_details.players.find(e => e.id === parseInt(localStorage.getItem("id")))
    const tempFooled = lobby.game_details.players.filter(x => x.votedForUserId === tempPlayer.id && x)
    const tempFooler = ({ mode: (tempPlayer.votedForUserId === 0), player: lobby.game_details.players.find(x => x.id === tempPlayer.votedForUserId && x), fooled: (tempFooled.length >= 1), foolers: tempFooled })
    setFooler(tempFooler)
    toast.dismiss()
    setTimeout(() => handleSolution(), 1500);
  }

  const handleSolution = () => {
    setSolution(true)
    setTimeout(() => handleFooled(), 3000);
  }

  const handleFooled = () => {
    setGameState("OUTCOME")
    setTimeout(() => handleScore(), 5000);
  }
  const handleScore = () => {
    setGameState("FOOLED")
    setSolution(false)
    setTimeout(() => setGameState("SCORE"), 5000);
  }

  return (
    <>
      <Header />
      <Information lobby={lobby} prep={prep} />
      {gameState === "DEFINITION" && <Definition lobby={lobby} prep={prep} />}
      {gameState === "VOTE" && <Voting lobby={lobby} solution={solution} prep={prep} />}
      {gameState === "OUTCOME" && <AnswerOutcome fooler={fooler} />}
      {gameState === "FOOLED" && <AnswerFooled fooler={fooler} />}
      {gameState === "SCORE" && <Score lobby={lobby} prep={prep} />}
    </>
  );
};

export default Game;
