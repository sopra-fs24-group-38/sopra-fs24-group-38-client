import React from "react";
import PropTypes from "prop-types";
import "../../styles/Cards.scss";

const AnswerFooled = ({ fooler }) => {
  return (
    <div className="bg-neutral-400 justify-center" id="hero">
      <div className="bg-neutral-100 flex flex-col shadow-md rounded-md p-5" id="gameQuestion">
        <div className="flex flex-col  h-full w-full rounded-xl justify-center items-center" id={`outcome ${fooler.fooled}`}>
          {fooler.fooled === false ?
            <h1 className="font-bold text-4xl text-center">You did not fool anyone</h1> :
            <>
              <h1 className="font-bold text-3xl text-center">You have fooled:<br /><br /></h1>
              <div key={1} className="flex flex-col justify-center items-center" id="foolmap">
                {fooler.foolers.map((player) => {
                  return (
                    <>
                      {player &&
                        <div key={player.id} id="fooled" className="flex flex-col items-center gap-y-1">
                          <h1 className="font-bold text-3xl text-center">{player.username}</h1>
                          <img src={`/assets/Ava${player.avatarId}.jpg`} alt="go" className="w-20 aspect-square rounded-xl" />
                        </div>}
                    </>)
                })}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

AnswerFooled.propTypes = {
  fooler: PropTypes.object
};

export default AnswerFooled;
