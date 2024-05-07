import React, { useEffect, useState, useContext, useRef } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import Header from "../ui/Header";
import LobbySettings from "../ui/LobbySettings";
import SxyButton from "../ui/SxyButton";
import { api, handleError } from "../../utils/api";
import "../../styles/Hero.scss";
import useFeedback from "../../hooks/useFeedback";
import WebSocketContext from "../../context/WebSocketContext";
import { toast } from "react-toastify";

const LobbyWaiting = () => {
  const navigate = useNavigate();
  const feedback = useFeedback()
  const headers = { "Authorization": localStorage.getItem("token") };
  const pin = useParams().id;
  const { lastMessage, sendJsonMessage } = useContext(WebSocketContext);
  const prep = useRef(null);

  const [showSettings, setShowSettings] = useState(false);
  const [settingsData, setSettingsData] = useState({
    rounds: 10,
    modes: ["BIZARRE"],
  });

  const [isGameMaster, setIsGameMaster] = useState("");
  const [starting, setStarting] = useState(false);
  const [players, setPlayers] = useState([]);
  const playerNamesRef = useRef(new Set());

  useEffect(() => {
    playerDelta(true);
    // fallback in case of reload or disconnect
    sendJsonMessage(
      {
        "action": "init",
        "userId": localStorage.getItem("id"),
        "lobbyId": `${pin}`
      }
    );
  }, []);

  useEffect(() => {
    console.log("Received message: ", lastMessage);
    if(lastMessage?.data && players.length !== 0){
      if(lastMessage.data === "user_joined"){
        playerDelta();

      } else if(lastMessage.data.includes("ai_removed")){
        const sus = players.filter(player => player.avatar.includes(JSON.parse(lastMessage.data).ai_removed));
        playerNamesRef.current.delete(sus[0].name);
        setPlayers(prevPlayers => prevPlayers.filter(player => player.avatar !== sus[0].avatar));

        feedback.give("A robo was sent to a farm upstate", 2000, "info");

      } else if(lastMessage.data.includes("user_left")){
        goodbye(JSON.parse(lastMessage.data).user_left);

      } else if(lastMessage.data.includes("gamehost_left")){
        goodbye(JSON.parse(lastMessage.data).gamehost_left, true);

      } else if(lastMessage.data === "game_preparing"){
        setStarting(true);
        prep.current = toast.loading("The game is starting soon")

      } else if(lastMessage.data === "game_start"){

        toast.update(prep.current, {
          render: "Let's gooo ╰( ^o^)╮╰( ^o^)╮",
          type: "success",
          theme: "colored",
          autoClose: 2500,
          isLoading: false,
        })
        navigate("/game");
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
      }

      // 1st statement checks for update need, 2nd statement is sessionGuard
      if (response.data.game_details.players.length > players.length && response.data.game_details.players.some(obj => obj.username.includes(localStorage.getItem("username")))){
        const newPlayers = response.data.game_details.players.slice(players.length)
          .filter(player => !playerNamesRef.current.has(player.username))
          .map(player => ({
            name: player.username,
            avatar: `/assets/Ava${player.avatarId}.jpg`,
          }));

        newPlayers.forEach(element => {
          feedback.give(`${element.name} has joined`, 1500, "success");

          playerNamesRef.current.add(element.name);
        });

        setPlayers(prevPlayers => [...prevPlayers, ...newPlayers]);
      } else{
        navigate("/lobby");
      }
    } catch(e){
      if(e.response.status === 401 || e.response.status === 404){
        navigate("/login");
      }
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const goodbye = async(username, hostLeft=false) => {
    try{
      setPlayers(prevPlayers => prevPlayers.filter(player => player.name !== username));
      playerNamesRef.current.delete(username);

      if(hostLeft){
        playerDelta(true);
        feedback.give(`${username} has left the party,\nthere is a new host`, 3000, "info");
      } else {
        feedback.give(`${username} has left the party`, 2000, "warning");
      }
    } catch(e){
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const addAI = async() => {
    try {
      const response = await api.put(`/lobbies/users/${pin}/ai`, {}, { headers });
    } catch(e) {
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const removeRobo = async(playerIndex) => {
    try {
      const avaId = players[playerIndex].avatar.substr(11, 3);
      const response = await api.delete(`/lobbies/users/${pin}/ai`, { data: {avatarId: avaId}, headers });
    } catch(e) {
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const startGame = async() => {
    try{
      const response = await api.post("/lobbies/start", {}, { headers });
      setStarting(true);

    } catch(e){
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const leaveLobby = async() => {
    try{
      const response = await api.delete(`/lobbies/users/${localStorage.getItem("pin")}`, { headers });

      localStorage.removeItem("pin");
      navigate("/lobby");
    } catch(error){
      feedback.give(handleError(error), 3000, "error");
    }
  };


  return (
    <>
      <Header />
      <div className="bg-neutral-400 flex flex-col justify-center relative" id="hero">
        <div className="bg-neutral-100 max-w-sexy mb-10 p-9 shadow-md rounded-lg" id="lobbywaiting">
          <h1 className="font-semibold text-center mb-3 text-2xl">PIN: <b>{pin}</b></h1>
          <h1 className="font-semibold text-center text-2xl"><b>{isGameMaster}</b> is the host</h1>
          <div className="flex gap-x-5 mx-3 mt-4 items-center">
            <SxyButton
              text="Start Game"
              color={"#72171D"}
              func={startGame}
              disabled={players.length < 2 || isGameMaster !== localStorage.getItem("username") || starting}
              width="120px"
            />

            {isGameMaster === localStorage.getItem("username") ?
              <>
                <SxyButton
                  text="Settings"
                  color={"#72171D"}
                  disabled={starting}
                  func={() => setShowSettings(true)}
                  width="120px"
                />

                <SxyButton
                  text="Add AI player"
                  color={"#16BA34"}
                  disabled={players.length === 5 || starting}
                  func={addAI}
                  width="120px"
                />
              </>
              : null
            }

            <SxyButton
              text="Leave Lobby"
              width="120px"
              color={"#CC1F1D"}
              disabled={starting}
              func={leaveLobby}
            />
          </div>
        </div>
        <div className="bg-neutral-400 p-8 rounded-lg shadow-md relative" >
          <div id="lobbyplayas">
            {players.length < 2 ? <p></p> : <img src={players[1].avatar} alt="player 2" id={(players[1].avatar.match(/10[0-9]/g) && isGameMaster === localStorage.getItem("username") && !starting) ? "robo" : ""} onClick={(players[1].avatar.match(/10[0-9]/g) && isGameMaster === localStorage.getItem("username") && !starting) ? () => removeRobo(1) : null} />}
            {players.length < 3 ? <p></p> : <img src={players[2].avatar} alt="player 3" id={(players[2].avatar.match(/10[0-9]/g) && isGameMaster === localStorage.getItem("username") && !starting) ? "robo" : ""} onClick={(players[2].avatar.match(/10[0-9]/g) && isGameMaster === localStorage.getItem("username") && !starting) ? () => removeRobo(2) : null} />}
            {players.length < 1 ? <p></p> : <img src={players[0].avatar} alt="player 1" id={(players[0].avatar.match(/10[0-9]/g) && isGameMaster === localStorage.getItem("username") && !starting) ? "robo" : ""} onClick={(players[0].avatar.match(/10[0-9]/g) && isGameMaster === localStorage.getItem("username") && !starting) ? () => removeRobo(0) : null} />}
            {players.length < 4 ? <p></p> : <img src={players[3].avatar} alt="player 4" id={(players[3].avatar.match(/10[0-9]/g) && isGameMaster === localStorage.getItem("username") && !starting) ? "robo" : ""} onClick={(players[3].avatar.match(/10[0-9]/g) && isGameMaster === localStorage.getItem("username") && !starting) ? () => removeRobo(3) : null} />}
            {players.length < 5 ? <p></p> : <img src={players[4].avatar} alt="player 5" id={(players[4].avatar.match(/10[0-9]/g) && isGameMaster === localStorage.getItem("username") && !starting) ? "robo" : ""} onClick={(players[4].avatar.match(/10[0-9]/g) && isGameMaster === localStorage.getItem("username") && !starting) ? () => removeRobo(4) : null} />}
          </div>
          {players.length < 2 ? null : <p className="absolute top-2 left-4 font-bold text-lg z-20">{players[1].name}</p>}
          {players.length < 3 ? null : <p className="absolute top-2 right-4 font-bold text-lg z-20">{players[2].name}</p>}
          {players.length < 1 ? null : <p className="absolute top-52 left-4 font-bold text-lg z-20">{players[0].name}</p>}
          {players.length < 4 ? null : <p className="absolute bottom-2 left-4 font-bold text-lg z-20">{players[3].name}</p>}
          {players.length < 5 ? null : <p className="absolute bottom-2 right-4 font-bold text-lg z-20">{players[4].name}</p>}
          <div id="tooltip">Remove AI player</div>
        </div>

        {showSettings ?
          <LobbySettings out={() => setShowSettings(false)} config={settingsData} setConfig={(n) => setSettingsData(n)} />
          : null
        }
      </div>
    </>
  );
};

export default LobbyWaiting;
