import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const headers = { "Authorization": localStorage.getItem("nobody_is_perfect_token") };
  const pin = useParams().id;
  const { lastMessage, sendJsonMessage } = useContext(WebSocketContext);
  const prep = useRef(null);
  const [aiCount, setAiCount] = useState(0);

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
    // fallback in case of reload or disconnect
    sendJsonMessage(
      {
        "action": "init",
        "userId": localStorage.getItem("id"),
        "lobbyId": `${pin}`
      }
    );
    setTimeout(() => playerDelta(true), 100);
  }, []);

  useEffect(() => {
    console.log("Received message: ", lastMessage);
    if (lastMessage?.data && players.length !== 0) {
      if (lastMessage.data === "user_joined") {
        playerDelta();

      } else if (lastMessage.data.includes("ai_removed")) {
        const sus = players.filter(player => player.avatar.includes(JSON.parse(lastMessage.data).ai_removed));
        playerNamesRef.current.delete(sus[0].name);
        setAiCount(prev => prev - 1);
        setPlayers(prevPlayers => prevPlayers.filter(player => player.avatar !== sus[0].avatar));

        feedback.give("A robo was sent to a farm upstate", 2000, "info");

      } else if (lastMessage.data.includes("user_left")) {
        goodbye(JSON.parse(lastMessage.data).user_left);

      } else if (lastMessage.data.includes("gamehost_left")) {
        goodbye(JSON.parse(lastMessage.data).gamehost_left, true);

      } else if (lastMessage.data === "game_preparing") {
        setStarting(true);
        prep.current = toast.loading("The game is starting soon")

      } else if (lastMessage.data === "game_start") {

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


  const playerDelta = async (defineMaster = false) => {
    try {
      const response = await api.get(`/lobbies/${pin}`, { headers });
      if (defineMaster) {
        response.data.game_details.game_master_username === localStorage.getItem("username") ?
          setIsGameMaster(localStorage.getItem("username"))
          : setIsGameMaster(response.data.game_details.game_master_username);
      }

      // Routes the player to the right mode of the game
      if (response.data.game_details.game_state !== "WAITING") {
        navigate("/game");
      }

      // 1st statement checks for update need, 2nd statement is sessionGuard
      if (response.data.game_details.players.length > players.length && response.data.game_details.players.some(obj => obj.username.includes(localStorage.getItem("username")))) {
        const newPlayers = response.data.game_details.players.slice(players.length)
          .filter(player => !playerNamesRef.current.has(player.username))
          .map(player => ({
            name: player.username,
            avatar: `/assets/Ava${player.avatarId}.jpg`,
          }));

        newPlayers.forEach(element => {
          if (element.avatar.match(/10[0-9]/g)) {
            setAiCount(prev => prev + 1);
            feedback.give("The host has recruited some help", 1500, "info");
          } else {
            feedback.give(`${element.name} has joined`, 1500, "success");
          }

          playerNamesRef.current.add(element.name);
        });

        setPlayers(prevPlayers => [...prevPlayers, ...newPlayers]);
      } else {
        navigate("/lobby");
      }
    } catch (e) {
      if (e.response.status === 401) {
        localStorage.removeItem("nobody_is_perfect_token");
        localStorage.removeItem("pin");
        navigate("/login");
      }
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const goodbye = async (username, hostLeft = false) => {
    try {
      setPlayers(prevPlayers => prevPlayers.filter(player => player.name !== username));
      playerNamesRef.current.delete(username);

      if (hostLeft) {
        playerDelta(true);
        feedback.give(`${username} has left the party,\nthere is a new host`, 3000, "info");
      } else {
        feedback.give(`${username} has left the party`, 2000, "warning");
      }
    } catch (e) {
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const addAI = async () => {
    try {
      await api.put(`/lobbies/users/${pin}/ai`, {}, { headers });
    } catch (e) {
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const removeRobo = async (playerIndex) => {
    try {
      const avaId = players[playerIndex].avatar.substr(11, 3);
      await api.delete(`/lobbies/users/${pin}/ai`, { data: { avatarId: avaId }, headers });
    } catch (e) {
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const startGame = async () => {
    try {
      await api.post("/lobbies/start", {}, { headers });
      setStarting(true);

    } catch (e) {
      feedback.give(handleError(e), 3000, "error");
    }
  };

  const leaveLobby = async () => {
    try {
      await api.delete(`/lobbies/users/${localStorage.getItem("pin")}`, { headers });

      localStorage.removeItem("pin");
      navigate("/lobby");
    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
    }
  };

  const copyPIN = async () => {
    try {
      await navigator.clipboard.writeText(pin);
      feedback.give("PIN copied to clipboard", 1000, "info");
    } catch (e) {
      feedback.give(handleError(e), 2000, "error");
    }
  };


  return (
    <>
      <Header />
      <div className="bg-neutral-400 flex flex-col justify-center relative" id="hero">
        <div className="bg-neutral-100 max-w-sexy mb-10 p-9 shadow-md rounded-lg" id="lobbywaiting">
          <div className="mb-3 flex justify-center">
            <h1 className="font-semibold text-center text-2xl">PIN: <b>{pin}</b></h1>
            <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 cursor-pointer self-center" onClick={copyPIN}>
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M8.25005 8.5C8.25005 8.91421 8.58584 9.25 9.00005 9.25C9.41426 9.25 9.75005 8.91421 9.75005 8.5H8.25005ZM9.00005 8.267H9.75006L9.75004 8.26283L9.00005 8.267ZM9.93892 5.96432L10.4722 6.49171L9.93892 5.96432ZM12.2311 5V4.24999L12.2269 4.25001L12.2311 5ZM16.269 5L16.2732 4.25H16.269V5ZM18.5612 5.96432L18.0279 6.49171V6.49171L18.5612 5.96432ZM19.5 8.267L18.75 8.26283V8.267H19.5ZM19.5 12.233H18.75L18.7501 12.2372L19.5 12.233ZM18.5612 14.5357L18.0279 14.0083L18.5612 14.5357ZM16.269 15.5V16.25L16.2732 16.25L16.269 15.5ZM16 14.75C15.5858 14.75 15.25 15.0858 15.25 15.5C15.25 15.9142 15.5858 16.25 16 16.25V14.75ZM9.00005 9.25C9.41426 9.25 9.75005 8.91421 9.75005 8.5C9.75005 8.08579 9.41426 7.75 9.00005 7.75V9.25ZM8.73105 8.5V7.74999L8.72691 7.75001L8.73105 8.5ZM6.43892 9.46432L6.97218 9.99171L6.43892 9.46432ZM5.50005 11.767H6.25006L6.25004 11.7628L5.50005 11.767ZM5.50005 15.734L6.25005 15.7379V15.734H5.50005ZM8.73105 19L8.72691 19.75H8.73105V19ZM12.769 19V19.75L12.7732 19.75L12.769 19ZM15.0612 18.0357L14.5279 17.5083L15.0612 18.0357ZM16 15.733H15.25L15.2501 15.7372L16 15.733ZM16.75 15.5C16.75 15.0858 16.4143 14.75 16 14.75C15.5858 14.75 15.25 15.0858 15.25 15.5H16.75ZM9.00005 7.75C8.58584 7.75 8.25005 8.08579 8.25005 8.5C8.25005 8.91421 8.58584 9.25 9.00005 9.25V7.75ZM12.7691 8.5L12.7732 7.75H12.7691V8.5ZM15.0612 9.46432L15.5944 8.93694V8.93694L15.0612 9.46432ZM16.0001 11.767L15.2501 11.7628V11.767H16.0001ZM15.2501 15.5C15.2501 15.9142 15.5858 16.25 16.0001 16.25C16.4143 16.25 16.7501 15.9142 16.7501 15.5H15.2501ZM9.75005 8.5V8.267H8.25005V8.5H9.75005ZM9.75004 8.26283C9.74636 7.60005 10.0061 6.96296 10.4722 6.49171L9.40566 5.43694C8.65985 6.19106 8.24417 7.21056 8.25006 8.27117L9.75004 8.26283ZM10.4722 6.49171C10.9382 6.02046 11.5724 5.75365 12.2352 5.74999L12.2269 4.25001C11.1663 4.25587 10.1515 4.68282 9.40566 5.43694L10.4722 6.49171ZM12.2311 5.75H16.269V4.25H12.2311V5.75ZM16.2649 5.74999C16.9277 5.75365 17.5619 6.02046 18.0279 6.49171L19.0944 5.43694C18.3486 4.68282 17.3338 4.25587 16.2732 4.25001L16.2649 5.74999ZM18.0279 6.49171C18.494 6.96296 18.7537 7.60005 18.7501 8.26283L20.25 8.27117C20.2559 7.21056 19.8402 6.19106 19.0944 5.43694L18.0279 6.49171ZM18.75 8.267V12.233H20.25V8.267H18.75ZM18.7501 12.2372C18.7537 12.8999 18.494 13.537 18.0279 14.0083L19.0944 15.0631C19.8402 14.3089 20.2559 13.2894 20.25 12.2288L18.7501 12.2372ZM18.0279 14.0083C17.5619 14.4795 16.9277 14.7463 16.2649 14.75L16.2732 16.25C17.3338 16.2441 18.3486 15.8172 19.0944 15.0631L18.0279 14.0083ZM16.269 14.75H16V16.25H16.269V14.75ZM9.00005 7.75H8.73105V9.25H9.00005V7.75ZM8.72691 7.75001C7.6663 7.75587 6.65146 8.18282 5.90566 8.93694L6.97218 9.99171C7.43824 9.52046 8.07241 9.25365 8.73519 9.24999L8.72691 7.75001ZM5.90566 8.93694C5.15985 9.69106 4.74417 10.7106 4.75006 11.7712L6.25004 11.7628C6.24636 11.1001 6.50612 10.463 6.97218 9.99171L5.90566 8.93694ZM4.75005 11.767V15.734H6.25005V11.767H4.75005ZM4.75006 15.7301C4.73847 17.9382 6.51879 19.7378 8.72691 19.75L8.7352 18.25C7.35533 18.2424 6.2428 17.1178 6.25004 15.7379L4.75006 15.7301ZM8.73105 19.75H12.769V18.25H8.73105V19.75ZM12.7732 19.75C13.8338 19.7441 14.8486 19.3172 15.5944 18.5631L14.5279 17.5083C14.0619 17.9795 13.4277 18.2463 12.7649 18.25L12.7732 19.75ZM15.5944 18.5631C16.3402 17.8089 16.7559 16.7894 16.75 15.7288L15.2501 15.7372C15.2537 16.3999 14.994 17.037 14.5279 17.5083L15.5944 18.5631ZM16.75 15.733V15.5H15.25V15.733H16.75ZM9.00005 9.25H12.7691V7.75H9.00005V9.25ZM12.7649 9.24999C13.4277 9.25365 14.0619 9.52046 14.5279 9.99171L15.5944 8.93694C14.8486 8.18282 13.8338 7.75587 12.7732 7.75001L12.7649 9.24999ZM14.5279 9.99171C14.994 10.463 15.2537 11.1001 15.2501 11.7628L16.75 11.7712C16.7559 10.7106 16.3402 9.69106 15.5944 8.93694L14.5279 9.99171ZM15.2501 11.767V15.5H16.7501V11.767H15.2501Z" fill="#000000"></path>
              </g>
            </svg>
          </div>
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
                  disabled={players.length === 5 || starting || aiCount > 1}
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
