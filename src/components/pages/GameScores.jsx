import React, { useState } from "react";
import Header from "../ui/Header";
import { useNavigate } from "react-router-dom";

import "../../styles/Boards.scss";


const GameScores = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([
    { name: "Player 1", features: ["/assets/Ava1.jpg", "Samuel", "+5", "20"] },
    { name: "Player 2", features: ["/assets/Ava2.jpg", "Elia", "+2", "18"] },
    { name: "Player 3", features: ["/assets/Ava3.jpg", "Kusi", "+2", "17"] },
    { name: "Player 4", features: ["/assets/Ava4.jpg", "Cedric", "0", "15"] },
    { name: "Player 5", features: ["/assets/Ava5.jpg", "Harris", "0", "14"] },
  ]);

  return(
    <>
      <Header />
      <div id="hero">
        <div className="bg-neutral-100  shadow-md w-96 h-fit p-4 rounded-lg" id="gameScores">
          <h1 className="mb-6 font-semibold text-xl hover:cursor-pointer" onClick={() => navigate("/end")}>Leaderboard</h1>
          <div className="grid grid-cols-4 grid-rows-6 gap-y-2">
            {players.flatMap((player, playerIndex) =>
              player.features.map((feature, featureIndex) => (
                <div key={`${playerIndex}-${featureIndex}`} className="p-2 border border-gray-300 rounded">
                  {featureIndex === 0 ? (
                    <img src={feature} alt={`${player.name}'s pic`} className="w-full h-auto" />
                  ) : (
                    <p>{feature}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameScores;
