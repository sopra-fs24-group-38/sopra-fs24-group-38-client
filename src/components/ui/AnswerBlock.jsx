import React from "react";

const AnswerBlock = ({answer="-", votingPlayers=[], func, style={}}) => {

  return(
    <div className="flex relative hover:cursor-pointer" onClick={() => func()}>
      <div className="flex gap-x-3 absolute -top-3 -left-2">
        {votingPlayers.map((player) => (
          <div key={player.name}>
            <img src={player.url} alt={`${player.name}'s pic`} className="w-12 aspect-square border-2 border-black rounded" />
          </div>
        ))}
      </div>
      <div className="flex grow bg-supporange-200 rounded-md p-5 items-center justify-center text-xl text-center" style={style} id="answer-text">
        {answer}
      </div>
    </div>
  );
};

export default AnswerBlock;
