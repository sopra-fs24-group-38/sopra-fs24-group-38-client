import React, { useState } from "react";
import "../../styles/Hero.scss";
import SxyButton from "./SxyButton";
import SxyInput from "./SxyInput";
import { useParams } from "react-router";
import { api, handleError } from "../../utils/api";
import useFeedback from "../../hooks/useFeedback";

const LobbySettings = ({out}) => {
  const feedback = useFeedback();
  const gameId = useParams().id;
  const [modes, setModes] = useState(["BIZARRE"]);
  const [rounds, setRounds] = useState(10);

  const saveSettings = async() => {
    try{
      const headers = { "Authorization": localStorage.getItem("token") };
      await api.put(`/lobbies/${gameId}`, {"game_modes": modes, "rounds": rounds}, { headers });

      feedback.give("The settings have been adjusted", 2000, "success");
      out();
    } catch(e){
      feedback.give(handleError(e), 3000, "error");
    } 
  }

  const modeSelection = (mode) => {
    if(!modes.includes(mode)){
      setModes(current => [...current, mode]);
    }
    else if(modes.includes(mode) && modes.length !== 1){
      setModes(current => current.filter(topic => topic !== mode));
    }
  };


  return(
    <div className="absolute flex flex-col p-10 items-center justify-around bg-brand-500" id="settings">
      <h1 className="text-center text-5xl font-bold">Settings</h1>

      <div className="flex flex-col">
        <h1 className="text-center text-xl font-bold">Modes</h1>
        <div className="flex flex-col gap-y-4 border-solid border-2 border-black p-4 rounded-xl" id="settingsBtn">
          <SxyButton
            text="Bizarre"
            color={modes.includes("BIZARRE") ? "#8227B3" : "#B479D4"}
            width="120px"
            func={() => modeSelection("BIZARRE")}/>
          <SxyButton
            text="Dutch"
            color={modes.includes("DUTCH") ? "#8227B3" : "#B479D4"}
            width="120px"
            func={() => modeSelection("DUTCH")}/>
          <SxyButton
            text="Programming"
            color={modes.includes("PROGRAMMING") ? "#8227B3" : "#B479D4"}
            width="120px"
            func={() => modeSelection("PROGRAMMING")}/>
          <SxyButton
            text="Rare Foods"
            color={modes.includes("RAREFOODS") ? "#8227B3" : "#B479D4"}
            width="120px"
            func={() => modeSelection("RAREFOODS")}/>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-xl">Rounds: {rounds}</h1>
        <SxyInput
          type="range"
          value={rounds}
          func={(n) => setRounds(n)}
          max={15}
          min={3}/>
      </div>

      <div className="flex w-60 justify-between" id="login-btn">
        <SxyButton
          text="Save"
          func={saveSettings}
          width="75px"
          color={"#731224"}
        />
        <SxyButton
          text="Cancel"
          func={() => out()}
          width="75px"
          color={"red"}
        />
      </div>
    </div>
  );
};

export default LobbySettings;
