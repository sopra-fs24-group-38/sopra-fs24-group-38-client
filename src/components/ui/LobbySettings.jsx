import React from "react";
import "../../styles/Hero.scss";
import SxyButton from "./SxyButton";

const LobbySettings = ({out}) => {

  const saveSettings = () => {

  }

  return(
    <div className="absolute flex flex-col p-10 items-center justify-between bg-brand-500" id="settings">
      <h1 className="text-center text-5xl font-bold">Settings</h1>

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
