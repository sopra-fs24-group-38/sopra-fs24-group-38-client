import React, { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../ui/Header";
import LobbySettings from "../ui/LobbySettings";
import SxyButton from "../ui/SxyButton";
import { api, handleError } from "../../utils/api";
import "../../styles/Hero.scss";
import useFeedback from "../../hooks/useFeedback";
import WebSocketContext from "../../context/WebSocketContext";

const LobbyWaiting = () => {
  const navigate = useNavigate();
  const feedback = useFeedback()
  const headers = { "Authorization": localStorage.getItem("token") };
  const pin = useParams().id;
  const { lastMessage } = useContext(WebSocketContext);

  const [sessionToken, setSessionToken] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [isGameMaster, setIsGameMaster] = useState(true);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    playerDelta();
  }, []);

  useEffect(() => {
    console.log("Received message: ", lastMessage);
    if(lastMessage && lastMessage.data){
      if(lastMessage.data === "user_joined"){
        console.log("Leggo");
        playerDelta();
      }
    }
  }, [lastMessage]);


  const playerDelta = async() => {
    try{
      const response = await api.get(`/lobbies/${pin}`, { headers });
      if (response.data.game_details.players.length > players.length){
        for(let i = players.length; i < response.data.game_details.players.length; i++ ){
          setPlayers(prevPlayers => [...prevPlayers,
            { name: response.data.game_details.players[i].name, avatar: generateUniqueAvatar()}]
          )
        }
      }
    } catch(e){
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const generateUniqueAvatar = () => {
    let avatarIndex;
    let isUnique = false;

    while (!isUnique) {
      avatarIndex = Math.floor(Math.random() * 6) + 1;
      isUnique = players.every(player => !player.features[0].includes(`Ava${avatarIndex}`));
    }

    return `/assets/Ava${avatarIndex}.jpg`;
  }

  const leaveLobby = async () => {
    try{
      const response = await api.delete(`/lobbies/users/${pin}`, { headers });

      navigate("/lobby");
    } catch(error){
      feedback.give(handleError(error), 3000, "error");
    }
  };


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
                {players.length < 2 ? <img alt=""/> : <img src={players[1].avatar} alt="player 2" />}
                {players.length < 3 ? <img alt=""/> : <img src={players[2].avatar} alt="player 3" />}
                {players.length < 1 ? <img alt=""/> : <img src={players[0].avatar} alt="player 1" />}
                {players.length < 4 ? <img alt=""/> : <img src={players[3].avatar} alt="player 4" />}
                {players.length < 5 ? <img alt=""/> : <img src={players[4].avatar} alt="player 5" />}
              </div>
              {players.length < 2 ? null : <p className="absolute top-2 left-4 font-bold text-lg z-20">{players[1].name}</p>}
              {players.length < 3 ? null : <p className="absolute top-2 right-4 font-bold text-lg z-20">{players[2].name}</p>}
              {players.length < 1 ? null : <p className="absolute top-48 left-4 font-bold text-lg z-20">{players[0].name}</p>}
              {players.length < 4 ? null : <p className="absolute bottom-2 left-4 font-bold text-lg z-20">{players[3].name}</p>}
              {players.length < 5 ? null : <p className="absolute bottom-2 right-4 font-bold text-lg z-20">{players[4].name}</p>}
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
