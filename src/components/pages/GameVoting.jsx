import React, { useState } from "react";
import Header from "../ui/Header";
import { useNavigate } from "react-router-dom";
import AnswerBlock from "../ui/AnswerBlock";


const GameVoting = () => {
  const navigate = useNavigate();
  const [chosenOne, setChosenOne] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState({
    border: "solid black 2px",
  });
  const [nextView, setNextView] = useState(false);

  const handleClick = (number) => {
    setChosenOne(number);

    setTimeout(() => setNextView(true), 3000);
  }


  return(
    <>
      <Header />
      <div id="hero">
        <div className="flex flex-col bg-neutral-100 shadow-md w-2/3 h-4/5 p-5 rounded-lg" id="gameVoting">
          <div className="flex mb-10 h-1/6 bg-supporange-200 rounded-md p-4 justify-center items-center">
            <p className="text-center text-xl">
              Who do you rarely ever expect?
            </p>
          </div>
          <h1 className="text-xl">Select an answer:</h1>
          <div className="grow grid grid-cols-2 grid-rows-3 gap-8 mt-6" key={nextView}>
            {!nextView ? <>
              <AnswerBlock answer="Don de la Vega" func={() => {}} />
              <AnswerBlock answer="Grilled Cheese" func={() => {}}/>
              <AnswerBlock answer="Spanish Inquisition" func={() => handleClick(3)} style={chosenOne === 3 ? selectedStyle : null} />
              <AnswerBlock answer="A fancy hat" func={() => {}}/>
              <AnswerBlock answer="None of your business" func={() => {}}/>
              <AnswerBlock answer="Banana" func={() => {}}/>
            </> : <>
              <AnswerBlock answer="Don de la Vega" func={() => navigate("/game3")} />
              <AnswerBlock answer="Grilled Cheese" votingPlayers={[{name: "Hu", feature: "/assets/Ava3.jpg"}]} func={() => {}}/>
              <AnswerBlock answer="Spanish Inquisition" style={{backgroundColor: "green", border: "solid black 2px",}} votingPlayers={[{name: "Juan", feature: "/assets/Ava1.jpg"}, {name: "Hans", feature: "/assets/Ava2.jpg"}]} func={() => {}} />
              <AnswerBlock answer="A fancy hat" func={() => {}}/>
              <AnswerBlock answer="None of your business" func={() => {}}/>
              <AnswerBlock answer="Banana" votingPlayers={[{name: "Han", feature: "/assets/Ava4.jpg"}, {name: "H", feature: "/assets/Ava6.jpg"}]} func={() => {}} />
            </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default GameVoting;
