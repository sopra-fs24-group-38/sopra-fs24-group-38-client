import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import SxyInput from "../ui/SxyInput";
import SxyButton from "../ui/SxyButton";
import useFeedback from "../../hooks/useFeedback";
import { useWebSocketContext } from '../../context/WebSocketContext';
import { api, handleError } from "../../utils/api";


const Game = () => {
  const navigate = useNavigate();
  const feedback = useFeedback()
  const { lastMessage, sendJsonMessage } = useWebSocketContext();
  const [submission, setSubmission] = useState("");
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

  // Use Effect to render new Lobbyinformation
  useEffect(() => {
    console.log('Received message:', lastMessage);
    getLobby();
    if (lobby.game_details.game_state ==="VOTE" || (lastMessage && lastMessage.data === "HELLO")) { // Testzweck bei HELLO weiter zu Game 2
      navigate("/game2");
    }
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


  const sendDefinition = async () => {
    try {
      const headers = { "Authorization": localStorage.getItem("token") };
      const response = await api.put(`/lobbies/users/definitions`, { definition: submission }, { headers }); //${localStorage.getItem("pin")}
      console.log(response.data)

    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
    }
  }

  return (
    <>
      <Header />
      <div id="hero">
        <div className="bg-neutral-100 flex flex-col shadow-md w-2/3 h-1/2 rounded-md p-5" id="gameQuestion">
          <div className="flex grow mb-8 bg-supporange-200 rounded-md p-4 justify-center items-center">
            <p className="text-center text-2xl">
              {lobby.game_details.challenge}
            </p>
          </div>
          <SxyInput
            label={"Fool your friends"}
            value={submission}
            func={(n) => setSubmission(n)}
          />
          <SxyButton
            text="Send"
            color={"#731224"}
            func={() => sendDefinition()}
          />
        </div>
      </div>
    </>
  );
};

export default Game;
