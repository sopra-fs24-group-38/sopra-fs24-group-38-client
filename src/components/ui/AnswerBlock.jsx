import React, { useState, useEffect} from "react";

const AnswerBlock = ({answer="-", votingPlayers=[], func, style={}}) => {

  return(
    <div className="flex relative hover:cursor-pointer" onClick={() => func()}>
      <div className="flex gap-x-3 absolute -top-6 left-4">
        {votingPlayers.map((player) => (
          <div key={player.name}>
            <img src={player.url} alt={`${player.name}'s pic`} className="w-12 aspect-square border-2 border-black rounded" />
          </div>
        ))}
      </div>
      <div className="flex grow bg-supporange-200 rounded-md p-2 items-center justify-center text-xl" style={style}>
        {answer}
      </div>
    </div>
  );
};

export default AnswerBlock;
