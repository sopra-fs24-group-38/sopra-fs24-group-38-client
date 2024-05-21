import React from "react";
import PropTypes from "prop-types"


const Information = (props) => {
  const { lobby } = props;

  return (
    <div className="justify-center items-center mt-12" id="info">
      <div className="bg-neutral-100 flex flex-col shadow-md max-w-sexy rounded-xl" id="infofield">
        <div className="flex flex-col py-3 px-20 bg-supporange-200 rounded-md justify-center items-center">
          <p className="text-center text-1xl p-1">
            Round: {lobby.game_details.round_number} / {lobby.game_details.max_round_numbers} 
            {/* change game_master_id to Rounds if the endpoint changes */}
          </p>
          {lobby.game_details.hide_mode ? null :
            <p className="text-center text-1xl break-words">
              Mode: {lobby.game_details.game_mode}
            </p>
          }
        </div>
      </div>
    </div>
  );
};


Information.propTypes = {
  lobby: PropTypes.object
};

export default Information;
