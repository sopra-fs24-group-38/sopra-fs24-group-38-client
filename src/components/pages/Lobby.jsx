import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import SxyButton from "../ui/SxyButton";
import SxyInput from "../ui/SxyInput";
import useWebSocket from 'react-use-websocket';
import "../../styles/Hero.scss";
import { api, handleError } from "../../utils/api";
import useFeedback from "../../hooks/useFeedback";
import { useWebSocketContext } from '../../context/WebSocketContext';

const Lobby = () => {
  const navigate = useNavigate();
  const feedback = useFeedback();
  const socketUrl = 'ws://localhost:8080/websockets';
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");
  const { sendJsonMessage } = useWebSocketContext();

  const createLobby = async () => {
    try{
      const headers = { "Authorization": localStorage.getItem("token") };
      const response = await api.post("/lobbies", {}, { headers });
      sendJsonMessage(
          {

            "action": "init",
            "userId": localStorage.getItem("id"),
            "lobbyId": `${response.data.game_pin}`

          }
      )
      navigate(`/lobby/${response.data.game_pin}`);

    } catch(error) {
      feedback.give(handleError(error), 3000, "error");
    }
  }

  const joinLobby = async () => {
    try{
      const headers = { "Authorization": localStorage.getItem("token") };
      const response = await api.put(`/lobbies/users/${pin}`, {pin}, {headers}); // why double pin neccessary?
      sendJsonMessage(
          {
              "action": "init",
              "userId": localStorage.getItem("id"),
              "lobbyId": `${response.data.game_pin}`
           }
        )
      navigate(`/lobby/${pin}`);

    } catch(error){
      feedback.give(handleError(error), 3000, "error");
    }
  }

  return(
    <>
      <Header leave />
      <div className="bg-neutral-400" id="hero">
        <div className="bg-neutral-100 max-w-sexy p-10 shadow-md rounded-lg">
          <h1 className="font-bold text-center mt-4 text-2xl">Welcome {localStorage.getItem("username")}</h1>
          <div className="flex flex-col m-10 h-32 justify-between items-center">
            <SxyButton
              text="Create Lobby"
              color={"#72171D"}
              func={createLobby}
              width="120px"
            />

            {showPin ?
              <>
                <div className="flex justify-between relative" id="lobbypin">
                  <SxyButton
                    text="Send"
                    color={"#72171D"}
                    func={joinLobby}
                    width="50px"/>
                  <SxyButton
                    text="Cancel"
                    color={"red"}
                    func={() => setShowPin(false)}
                    width="55px" />
                  <SxyInput
                    value={pin}
                    color={"#ebe4d7"}
                    inputMode={"numeric"}
                    maxLength={"4"}
                    placeholder="1234"
                    func={(n) => setPin(n)}
                    enterKey={joinLobby}/>
                </div>
              </>
              :
              <SxyButton
                text="Join Lobby"
                color={"#72171D"}
                func={() => setShowPin(true)}
                width="120px"
              />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
