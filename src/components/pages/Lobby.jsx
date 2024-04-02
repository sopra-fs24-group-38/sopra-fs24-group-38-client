import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import SxyButton from "../ui/SxyButton";
import "../../styles/Hero.scss";
import { api, handleError } from "../../utils/api";
import useFeedback from "../../hooks/useFeedback";

const Lobby = () => {
  const navigate = useNavigate();
  const feedback = useFeedback();

  const createLobby = async () => {
    try{
      const headers = { "Authorization": localStorage.getItem("token") };
      const response = await api.post("/lobbies", {}, { headers });

      // navigate(`/lobby/${response.data.game_pin}`)

    } catch(error) {
      feedback.give(handleError(error), 3000, "error");
    }
  }

  return(
    <>
      <Header leave />
      <div className="bg-neutral-400" id="hero">
        <div className="bg-neutral-100 max-w-sexy h-auto shadow-md rounded-lg">
          <h1 className="font-bold text-center m-10 text-2xl">Welcome {localStorage.getItem("username")}</h1>
          <div className="flex flex-col h-1/1 m-20 justify-evenly items-center">
            <SxyButton
              text="Create Lobby"
              color={"#72171D"}
              func={createLobby}
              width="120px"
            />
            <div className="h-20"></div>
            <SxyButton
              text="Join Lobby"
              color={"#72171D"}
              func={() => {}}
              width="120px"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
