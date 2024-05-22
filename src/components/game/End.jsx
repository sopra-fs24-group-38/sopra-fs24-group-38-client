import React, { useEffect, useRef, useState, useContext } from "react";
import SxyButton from "../ui/SxyButton";
import useFeedback from "../../hooks/useFeedback";
import { api, handleError } from "../../utils/api";
import Header from "../ui/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import WebSocketContext from "../../context/WebSocketContext";

import "../../styles/Winners.scss";


const End = () => {
  const { sendJsonMessage, lastMessage } = useContext(WebSocketContext);
  const feedback = useFeedback();
  const navigate = useNavigate();
  const headers = { "Authorization": localStorage.getItem("nobody_is_perfect_token") };
  const [players, setPlayers] = useState([]);
  const isHost = useRef(false);
  const [go, setGo] = useState(false);

  useEffect(() => {
    toast.dismiss()
    sendJsonMessage(
      {
        "action": "init",
        "userId": localStorage.getItem("id"),
        "lobbyId": `${localStorage.getItem("pin")}`
      }
    )
    
    setTimeout(() => tally(), 100);
  }, []);

  useEffect(() => {
    if(lastMessage?.data){
      if(lastMessage.data === "gamemaster_newround"){
        setGo(true);
      }
    }
  }, [lastMessage])

  const tally = async () => {
    try {
      const response = await api.get(`/lobbies/${localStorage.getItem("pin")}`, { headers });
      // ordering
      setPlayers(response.data.game_details.static_stats.slice().sort((a, b) => b.score - a.score));
      // check host
      if(response.data.game_details.game_master_username === localStorage.getItem("username")){
        isHost.current = true;
      }
    } catch (e) {
      feedback.give(handleError(e), 3000, "error");
      unauthorized(e)
    }
  };

  const aightImmaLeave = async () => {
    try {
      if(isHost.current){
        await api.put("/lobbies/newround", {}, { headers });
      }
      await api.delete(`/lobbies/users/${localStorage.getItem("pin")}`, { headers })

      localStorage.removeItem("pin");
      navigate("/lobby");
    } catch (e) {
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const anotherOne = async() => {
    try {
      if(isHost.current){
        await api.put("/lobbies/newround", {}, { headers });
      }

      navigate(`/lobby/${localStorage.getItem("pin")}`)
    } catch(e) {
      feedback.give(handleError(e), 3000, "error");
    }
  };


  const unauthorized = (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("nobody_is_perfect_token");
      localStorage.removeItem("pin");
      navigate("/login");
    }
    if (error.response.status === 404 || error.response.status === 400) {
      localStorage.removeItem("pin");
      navigate("/lobby");
    }
  }

  return (
    <>
      <Header />
      <div className="bg-neutral-400 justify-center" id="hero">
        <div className="bg-neutral-100 flex flex-col max-w-sexy p-10 shadow-md rounded-lg" id="endScreen">
          <div id="ranks">
            {/* place 1-3 */}
            {players.length !== 0 ?
              <div className="flex justify-center mb-40 mt-6" id="top3">
                <div className="relative">
                  <div className="border-div" id="w1" />
                  <img className="w-40" src={`/assets/Ava${players[0].avatarId}.jpg`} alt="winner 1" />

                  <div className="absolute -left-16 -bottom-28" >
                    <div className="border-div" id="w2" />
                    <img className="w-32" src={`/assets/Ava${players[1].avatarId}.jpg`} alt="winner 2" />
                  </div>
                  <div className="absolute -right-16 -bottom-28">
                    {players.length > 2 ? <>
                      <div className="border-div" id="w3" />
                      <img className="w-32" src={`/assets/Ava${players[2].avatarId}.jpg`} alt="winner 3" />
                    </> : null}
                  </div>

                  <h1 id="w1n">{players[0].username}</h1>
                  <h1 id="w2n">{players[1].username}</h1>
                  {players.length > 2 ? <h1 id="w3n">{players[2].username}</h1> : null}

                  <h1 id="w1p">{players[0].score} pts</h1>
                  <h1 id="w2p">{players[1].score} pts</h1>
                  {players.length > 2 ? <h1 id="w3p">{players[2].score} pts</h1> : null}
                </div>
              </div>
              : null}

            {/* places 4+ */}
            {players.length > 3 ?
              <div className="grid grid-cols-3 gap-y-3 w-80 items-start">
                {players.slice(3).flatMap((player, index) => [
                  <div key={`ava-${player.username}`} >
                    <img src={`/assets/Ava${player.avatarId}.jpg`} alt={`player-${index}`} className="w-20 rounded-lg" />
                  </div>,
                  <div key={`name-${player.username}`} className="pt-1" >
                    <p>{player.username}</p>
                  </div>,
                  <div key={`score-${player.username}`} className="items-end justify-self-center pt-1">
                    <p>{player.score} pts</p>
                  </div>,
                ])}
              </div> : null}
          </div>

          <div className="flex justify-around mt-8 w-80 mx-auto" id="endBtn">
            <SxyButton
              text="New Game"
              width="100px"
              color={"#731224"}
              disabled={!isHost.current && !go}
              func={anotherOne}
            />
            <SxyButton
              text="Leave Session"
              width="110px"
              color={"#731224"}
              func={aightImmaLeave}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default End;
