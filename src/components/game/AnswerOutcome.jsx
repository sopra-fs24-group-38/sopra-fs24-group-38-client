import React from "react";
import PropTypes from "prop-types";
import "../../styles/Cards.scss";

const AnswerOutcome = ({ fooler }) => {
  return (
    <div className="bg-neutral-400 justify-center" id="hero">
      <div className="bg-neutral-100 flex flex-col shadow-md rounded-md p-5" id="gameQuestion">
        <div className="flex flex-col h-full w-full rounded-xl justify-center items-center" id={`outcome ${fooler.mode}`}>
          {fooler.mode === true ?
            <h1 className="font-bold text-4xl">You were right!</h1> :
            <>
              <h1 className="font-bold text-3xl text-center">You have been fooled by:<br /><br />{fooler.player.username}</h1>
              <img src={`/assets/Ava${fooler.player.avatarId}.jpg`} alt="go" className="w-20 mt-5 aspect-square rounded-xl" />
            </>}
        </div>
      </div>
    </div>
  );
};

AnswerOutcome.propTypes = {
  fooler: PropTypes.object
};

export default AnswerOutcome;
