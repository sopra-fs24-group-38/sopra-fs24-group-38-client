import React, { useContext, useEffect, useState } from "react";
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
  const headers = { "Authorization": localStorage.getItem("nobody_is_perfect_token") };
  const { sendJsonMessage } = useContext(WebSocketContext);

  useEffect(() => { 
    if (localStorage.getItem("pin")) {
      navigate(`/lobby/${localStorage.getItem("pin")}`);
    }
  }, [])

  const createLobby = async () => {
    try {
      const response = await api.post("/lobbies", {}, { headers });
      localStorage.setItem("pin", response.data.game_pin)
      sendJsonMessage(
        {
          "action": "init",
          "userId": localStorage.getItem("id"),
          "lobbyId": `${response.data.game_pin}`
        }
      )
      navigate(`/lobby/${response.data.game_pin}`);

    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
      unauthorized(error);
    }
  };

  const joinLobby = async () => {
    try {
      const response = await api.put(`/lobbies/users/${pin}`, {}, { headers });
      sendJsonMessage(
        {
          "action": "init",
          "userId": localStorage.getItem("id"),
          "lobbyId": `${response.data.game_pin}`
        }
      )

      localStorage.setItem("pin", pin);
      navigate(`/lobby/${pin}`);

    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
      unauthorized(error);
    }
  };

  const unauthorized = (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("nobody_is_perfect_token");
      localStorage.removeItem("pin");
      navigate("/login");
    }
  }

  return (
    <>
      {localStorage.getItem("nobody_is_perfect_token") ?
        <>
          <Header leave />
          <div className="bg-neutral-400 justify-center" id="hero">
            <div className="bg-neutral-100 max-w-sexy p-10 shadow-md rounded-lg" id="lobby">
              <h1 className="font-bold text-center mt-4 text-2xl">Welcome {localStorage.getItem("username")}</h1>
              <div className="flex flex-col m-10 gap-y-10 justify-between items-center" id="lobbyButtons">
                <SxyButton
                  text="Global Leaderboard"
                  color={"#72171D"}
                  func={() => navigate("/leaderboard")}
                  width="120px"
                />

                <SxyButton
                  text="Create Lobby"
                  color={"#72171D"}
                  func={createLobby}
                  width="120px"
                />

                {showPin ?
                  <div className="flex justify-between relative" id="lobbypin">
                    <SxyButton
                      text="Send"
                      color={"#72171D"}
                      func={joinLobby}
                      disabled={pin.length !== 4}
                      width="50px" />
                    <SxyButton
                      text="Cancel"
                      color={"red"}
                      func={() => setShowPin(false)}
                      width="55px" />
                    <SxyInput
                      value={pin}
                      color={"#ebe4d7"}
                      maxLength={4}
                      placeholder="1234"
                      func={(n) => /^\d*$/.test(n) ? setPin(n) : null}
                      enterKey={pin.length === 4 ? joinLobby : null} />
                  </div>
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
