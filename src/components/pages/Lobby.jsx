import React, { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "../ui/Header";
import SxyButton from "../ui/SxyButton";
import SxyInput from "../ui/SxyInput";
import "../../styles/Hero.scss";
import { api, handleError } from "../../utils/api";
import useFeedback from "../../hooks/useFeedback";
import WebSocketContext from "../../context/WebSocketContext";

const Lobby = () => {
  const navigate = useNavigate();
  const feedback = useFeedback();
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");
  const headers = { "Authorization": localStorage.getItem("token") };
  const { sendJsonMessage } = useContext(WebSocketContext);

  const createLobby = async () => {
    try{
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
      const response = await api.put(`/lobbies/users/${pin}`, {}, { headers });
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
      {localStorage.getItem("token") ?
        <>
          <Header leave />
          <div className="bg-neutral-400 justify-center" id="hero">
            <div className="bg-neutral-100 max-w-sexy p-10 shadow-md rounded-lg">
              <h1 className="font-bold text-center mt-4 text-2xl">Welcome {localStorage.getItem("username")}</h1>
              <div className="flex flex-col m-10 gap-y-10 justify-between items-center">
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
        : <Navigate to={"/login"} />}
    </>
  );
};

export default Lobby;
