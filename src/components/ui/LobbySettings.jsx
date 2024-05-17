import React, { useState } from "react";
import "../../styles/Hero.scss";
import SxyButton from "./SxyButton";
import SxyInput from "./SxyInput";
import { useParams } from "react-router";
import { api, handleError } from "../../utils/api";
import useFeedback from "../../hooks/useFeedback";

const LobbySettings = ({out, config, setConfig}) => {
  const feedback = useFeedback();
  const gameId = useParams().id;
  const [modes, setModes] = useState(config.modes);
  const [rounds, setRounds] = useState(config.rounds);
  const [hide, setHide] = useState(config.hide);

  const saveSettings = async() => {
    try{
      const headers = { "Authorization": localStorage.getItem("nobody_is_perfect_token") };
      await api.put(`/lobbies/${gameId}`, {"game_modes": modes, "rounds": rounds, "hide_mode": hide}, { headers });
      setConfig(before => ({
        ...before,
        modes: modes,
        rounds: rounds,
        hide: hide,
      }));

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

      <div className="flex flex-col items-center">
        <h1 className="text-center text-xl font-bold">Modes</h1>
        <div className="flex flex-col gap-y-4 w-fit border-solid border-2 border-black p-4 rounded-xl" id="settingsBtn">
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

        <label className="flex mt-3 font-semibold">
          <input
            className="mr-2"
            type="checkbox"
            checked={hide}
            onChange={() => setHide(!hide)}
          />
          Hide mode origin<br/>for definition
        </label>
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
