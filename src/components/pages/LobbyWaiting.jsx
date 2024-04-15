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

  const [sessionToken, setSessionToken] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isGameMaster, setIsGameMaster] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    playerDelta(true);
  }, []);

  useEffect(() => {
    console.log("Received message: ", lastMessage);
    if(lastMessage && lastMessage.data){
      if(lastMessage.data === "user_joined"){
        playerDelta();
        console.log(lastMessage.data);
      } else if(lastMessage.data === "user_left"){
        // TODO: include username from message in parameter
        goodbye();
      } else if(lastMessage.data === "new_gamehost"){
        goodbye(true);
      } else if(lastMessage.data === "game_start"){
        navigate(`/game/${pin}`);
      }
    }
  }, [lastMessage]);


  const playerDelta = async(defineMaster=false) => {
    try{
      const response = await api.get(`/lobbies/${pin}`, { headers });
      if(defineMaster){
        response.data.game_details.game_master_username === localStorage.getItem("username") ?
          setIsGameMaster(localStorage.getItem("username"))
          : setIsGameMaster(response.data.game_details.game_master_username);
        
        setSessionToken(response.data.game_details.players.some(obj => obj.username.includes(localStorage.getItem("username"))));
      }

      if (response.data.game_details.players.length > players.length){
        const newPlayers = response.data.game_details.players.slice(players.length).map(player => ({
          name: player.username,
          avatar: `/assets/Ava${player.avatarId}.jpg`,
        }));

        setPlayers(prevPlayers => [...prevPlayers, ...newPlayers]);
      }
      console.log(response.data)
    } catch(e){
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const goodbye = async(hostLeft=false, username) => {
    try{
      setPlayers(prevPlayers => prevPlayers.filter(player => player.name !== username));

      if(hostLeft){
        playerDelta(true);
        // TODO: might need to do a functional state update in playerDelta
        feedback.give(`${username} has left the party, ${isGameMaster} is now the host`, 3000, "info");
      } else {
        feedback.give(`${username} has left the party`, 3000, "info");
      }
    } catch(e){
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const startGame = async() => {
    try{
      const response = await api.post("/lobbies/start", { headers });
      feedback.give("The game is starting now\n╰( ^o^)╮╰( ^o^)╮", 3000, "success");
    } catch(e){
      feedback.give(handleError(e), 3000, "error");
    }
  };

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
      {sessionToken ?
        <>
          <Header />
          <div className="bg-neutral-400 flex flex-col relative" id="hero">
            <div className="bg-neutral-100 max-w-sexy p-10 mb-6 shadow-md rounded-lg">
              <h1 className="font-semibold text-center mb-3 text-2xl">PIN: <b>{pin}</b></h1>
              <h1 className="font-semibold text-center text-2xl"><b>{isGameMaster}</b> is the host</h1>
              <div className="flex flex-col gap-y-5 mx-4 mt-6 items-center">
                <SxyButton
                  text="Start Game"
                  color={"#72171D"}
                  func={startGame}
                  disabled={players.length < 2 || isGameMaster !== localStorage.getItem("username")}
                  width="120px"
                />

                {isGameMaster === localStorage.getItem("username") ?
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
                {players.length < 2 ? <p></p> : <img src={players[1].avatar} alt="player 2" />}
                {players.length < 3 ? <p></p> : <img src={players[2].avatar} alt="player 3" />}
                {players.length < 1 ? <p></p> : <img src={players[0].avatar} alt="player 1" />}
                {players.length < 4 ? <p></p> : <img src={players[3].avatar} alt="player 4" />}
                {players.length < 5 ? <p></p> : <img src={players[4].avatar} alt="player 5" />}
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
        : <Navigate to={"/lobby"} />}
    </>
  );
};

export default LobbyWaiting;
