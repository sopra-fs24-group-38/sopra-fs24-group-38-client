import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import SxyButton from "../ui/SxyButton";
import "../../styles/Hero.scss";
import useFeedback from "../../hooks/useFeedback";
import { api, handleError } from "../../utils/api";

const Leaderboard = () => {
  const navigate = useNavigate();
  const feedback = useFeedback();
  const headers = { "Authorization": localStorage.getItem("nobody_is_perfect_token") };
  const [allstars, setAllstars] = useState([]);

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const response = await api.get("/users", { headers });
      setAllstars(prev => [...prev, response.data]);
    } catch(e) {
      feedback.give(handleError(e), 3000, "error");
      unauthorized(error);
    }
  };

  const unauthorized = (error) => {
    if (error.response.status === 401 || error.response.status === 404) {
      localStorage.removeItem("nobody_is_perfect_token");
      localStorage.removeItem("pin");
      navigate("/login");
    }
  }

  return(
    <>
      {localStorage.getItem("nobody_is_perfect_token") ?
        <div>
          <Header />
          <div className="bg-neutral-400 justify-center" id="hero">
            <div className="bg-neutral-100 p-10 shadow-md rounded-lg flex flex-col justify-between" id="leaderboard">
              {allstars ? 
                <div className="w-full grid gap-y-1 py-4 pl-4 bg-orange-400 rounded-lg mb-6 overflow-y-auto">
                  <p><b>Rank</b></p>
                  <p><b>Name</b></p>
                  <p><b>Points</b></p>
                  <p><b>Players fooled</b></p>
                  {allstars.flat().sort((a, b) => b.permanentScore - a.permanentScore).map((player, index) => [
                    <div key={`player-${index}`}>
                      {`#${index + 1}`}
                    </div>,
                    <div key={player.username}>
                      {player.username}
                    </div>,
                    <div key={`${player.username}-score`}>
                      {player.permanentScore}
                    </div>,
                    <div key={`${player.username}-fools`}>
                      {player.permanentFools}
                    </div>,
                  ])}
                </div> : <div />}
              <SxyButton
                text="Back"
                width="120px"
                color={"#72171D"}
                func={() => navigate("/lobby")}
              />
            </div>
          </div>
        </div>
        : <Navigate to={"/login"} />}
    </>
  );
};

export default Leaderboard;
