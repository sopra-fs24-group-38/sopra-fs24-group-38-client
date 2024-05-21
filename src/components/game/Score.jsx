import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SxyButton from "../ui/SxyButton";
import useFeedback from "../../hooks/useFeedback";
import { api, handleError } from "../../utils/api";
import { toast } from "react-toastify";

import "../../styles/Boards.scss";

const View = (props) => {
  const { player, playerIndex } = props;
  const selectedStyle = {
    "backgroundColor": "#F29544"
  };

  return (
    <>
      {player && (
        <div key={playerIndex} className="grid pb-2 gap-y-2" id="view">
          <div key={`${playerIndex}-avatar`} className="p-2 border border-gray-300 rounded " style={player.id === parseInt(localStorage.getItem("id")) ? selectedStyle : null}>
            <img src={`/assets/Ava${player.avatarId}.jpg`} alt={`${player.name}"s pic`} />
          </div>
          <div key={`${playerIndex}-name`} className="p-2" style={player.id === parseInt(localStorage.getItem("id")) ? selectedStyle : null}>
            <p>{player.username}</p>
          </div>
          <div key={`${player.avatarId}-ppr`} className="p-2" style={player.id === parseInt(localStorage.getItem("id")) ? selectedStyle : null}>
            <p>+{player.ppr}</p>
          </div>
          <div key={`${playerIndex}-score`} className="p-2" style={player.id === parseInt(localStorage.getItem("id")) ? selectedStyle : null}>
            <p>{player.score}</p>
          </div>
        </div>
      )}
    </>
  );
};


const Score = (props) => {
  const { lobby, prep } = props;
  const feedback = useFeedback();
  const [players, setPlayers] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPlayers(pointsPerRound(lobby.game_details.players))
  }, [lobby])

  const pointsPerRound = (playerList) => {
    const voteCount = new Map();

    // Count each vote
    playerList.forEach(player => {
      // Check if the votedForUserId is a valid id and not 0 or null
      if (player.votedForUserId && playerList.some(p => p.id === player.votedForUserId)) {
        voteCount.set(player.votedForUserId, (voteCount.get(player.votedForUserId) || 0) + 2);
      }
      // Increment by 1 if the player voted for "0" (correct-vote)
      if (player.votedForUserId === 0) {
        voteCount.set(player.id, (voteCount.get(player.id) || 0) + 1);
      }
    });

    // Add the "ppr" field to each player based on the counts collected
    const updatedPlayers = playerList.map(player => ({
      ...player,
      ppr: voteCount.get(player.id) || 0  // Use 0 if no votes found for this player
    })).sort((a, b) => b.score - a.score);

    return updatedPlayers
  }

  const nextRound = async () => {
    try {
      const headers = { "Authorization": localStorage.getItem("nobody_is_perfect_token") };
      await api.post("/lobbies/rounds/start", {}, { headers });
      setReady(true);
      prep.current = toast.loading("Waiting for other players", { position: "top-center"});
    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
    }
  }


  return (
    <div className="bg-neutral-400 justify-center" id="hero">
      <div className="bg-neutral-100 shadow-md p-10 rounded-lg" id="gameScores">
        <h1 className="mb-6 font-semibold text-xl hover:cursor-pointer">Leaderboard</h1>
        <div key={-1} className="grid pb-2 gap-y-2">
          <div key={`${-1}-avatar`} className="p-2"></div>
          <div key={`${-1}-name`} className="p-2">
            <b>Username</b>
          </div>
          <div key={`${-1}-ppr`} className="p-2">
            <b>Points</b>
          </div>
          <div key={`${-1}-score`} className="p-2">
            <b>Total score</b>
          </div>
        </div>
        <div className="mb-4 overflow-y-auto" id="scorePlayers">
          {players.flatMap((player, playerIndex) => {
            return (<View key={`player-${player.id}`} player={player} playerIndex={playerIndex} />)
          })
          }
        </div>
        <SxyButton
          text={lobby.game_details.round_number < lobby.game_details.max_round_numbers ? "Next round" : "Switch to victory screen!"}
          color={"#72171D"}
          disabled={ready}
          func={nextRound} />
      </div>
    </div>
  );
};

Score.propTypes = {
  lobby: PropTypes.object,
  prep: PropTypes.object
};

View.propTypes = {
  player: PropTypes.object,
  playerIndex: PropTypes.number
};

export default Score;
