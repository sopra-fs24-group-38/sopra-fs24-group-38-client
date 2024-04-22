import React from "react";
import PropTypes from "prop-types";
import "../../styles/Boards.scss";

const AnswerFooled = ({ fooler }) => {
  return (

    <div className="bg-neutral-400 justify-center" id="hero">
      <div className="bg-neutral-100 flex flex-col shadow-md w-2/3 h-1/2 rounded-md p-5" id="gameQuestion">
        <div className="flex flex-col  h-full w-full rounded-xl justify-center items-center" id={`outcome ${fooler.fooled}`}>
          {fooler.fooled === false ?
            <h1 className="font-bold text-4xl">You did not fool anyone</h1> :
            <>
              <h1 className="font-bold text-3xl text-center">You have fooled:<br /><br /></h1>
              <div id="scorePlayers">
                {fooler.foolers.map((p, index) => {
                  return (<>{p && <div key={index} id="fooled"> <h1 className="font-bold text-3xl text-center">{p.username}</h1><img src={`/assets/Ava${p.avatarId}.jpg`} alt="go" className="w-20 aspect-square rounded-xl" /> </div>} </>)
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