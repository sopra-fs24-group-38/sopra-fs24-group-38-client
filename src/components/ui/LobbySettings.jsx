import React from "react";
import "../../styles/Hero.scss";
import SxyButton from "./SxyButton";
import SxyInput from "./SxyInput";

const LobbySettings = ({out}) => {

  const saveSettings = () => {

  }

  return(
    <div className="absolute flex flex-col p-10 items-center justify-between bg-brand-500" id="settings">
      <h1 className="text-center text-5xl font-bold">Settings</h1>

      <div className="flex flex-col">
        <h1 className="text-center text-xl font-bold">Modes</h1>
        <div className="flex gap-x-4 border-solid border-2 border-black p-4 rounded-xl">
          <SxyButton
            text="Definitions"
            color={"#8227B3"}
            width="120px" />
          <SxyButton
            text="Dutch"
            color={"#8227B3"}
            width="120px" />
          <SxyButton
            text="Urban Dict"
            color={"#8227B3"}
            width="120px" />
        </div>
      </div>

      <SxyInput
        type="range"
        value={10}
        max={15}
        min={5}/>

      <div className="flex w-60 justify-between">
        <SxyButton
          text="Save"
          func={() => saveSettings}
          width="75px"
          color={"#72171D"}
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
