import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SxyButton from "../ui/SxyButton";
import useFeedback from "../../hooks/useFeedback";
import { api, handleError } from "../../utils/api";

import "../../styles/Boards.scss";

const View = (props) => {
  const { player } = props;

  return (
    <>
      <div key={`${player.avatarId}-avatar`} className="p-2 border border-gray-300 rounded">
        <img src={`/assets/Ava${player.avatarId}.jpg`} alt={`${player.name}'s pic`} className="w-full h-auto" />
      </div>
      <div key={`${player.avatarId}-name`} className="p-2 border border-gray-300 rounded">
        <p>{player.username}</p>
      </div>
      <div key={`${player.avatarId}-ppr`} className="p-2 border border-gray-300 rounded">
        <p>+{player.ppr}</p>
      </div>
      <div key={`${player.avatarId}-score`} className="p-2 border border-gray-300 rounded">
        <p>{player.score}</p>
      </div>
    </>
  )
}


const Score = (props) => {
  const { lobby } = props;
  const navigate = useNavigate();
  const feedback = useFeedback();
  const [players, setPlayers] = useState([]);


  useEffect(() => {
    setPlayers(pointsPerRound(lobby.game_details.players))

  }, [lobby])

  const pointsPerRound = (playerList) => {
    const voteCount = new Map();

    // Count each vote
    playerList.forEach(player => {
      // Check if the votedForUserId is a valid id and not 0 or null
      if (player.votedForUserId && playerList.some(p => p.id === player.votedForUserId)) {
        voteCount.set(player.votedForUserId, (voteCount.get(player.votedForUserId) || 0) + 1);
      }
      // Increment by 1 if the player voted for '0' (self-vote)
      if (player.votedForUserId === 0) {
        voteCount.set(player.id, (voteCount.get(player.id) || 0) + 1);
      }
    });

    // Add the 'ppr' field to each player based on the counts collected
    const updatedPlayers = playerList.map(player => ({
      ...player,
      ppr: voteCount.get(player.id) || 0  // Use 0 if no votes found for this player
    }));

    return updatedPlayers


  }
  const nextRound = async () => {
    try {
      const headers = { "Authorization": localStorage.getItem("token") };
      const response = await api.post(`/lobbies/rounds/start`, {}, { headers });

    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
    }
  }


  return (
    <div className="bg-neutral-400 justify-center" id="hero">
      <div className="bg-neutral-100  shadow-md w-96 h-fit p-4 rounded-lg" id="gameScores">
        <h1 className="mb-6 font-semibold text-xl hover:cursor-pointer">Leaderboard</h1>
        <div className="grid grid-cols-4 grid-rows-6 gap-y-2">
          {players.flatMap((player, playerIndex) => {
            return (<View player={player} />)
          }

          )}
        </div>
        <SxyButton
          text="next round"
          color={"#72171D"}
          func={nextRound} />
      </div>
    </div>
  );
};

Score.propTypes = {
  lobby: PropTypes.object
};

View.propTypes = {
  player: PropTypes.object
};

export default Score;
