import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"


const Information = (props) => {
  const { lobby, prep } = props;

  return (
    <div className="justify-center items-center" id="info">
      <div className="bg-neutral-100 flex flex-col shadow-md max-w-sexy rounded-xl" id="infofield">
        <div className="flex flex-col py-1 px-24 bg-supporange-200 rounded-md justify-center items-center">
          <p className="text-center text-1xl p-1">
            Rounds: {lobby.game_details.game_master_id} 
            {/* change game_master_id to Rounds if the endpoint changes */}
          </p>
          <p className="text-center text-1xl break-words">
            Mode: {lobby.game_details.game_mode}
          </p>
        </div>
      </div>
    </div>
      )
    }


      Information.propTypes = {
        lobby: PropTypes.object
};


      export default Information;
