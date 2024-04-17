import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AnswerBlock from "../ui/AnswerBlock";


const Voting = (props) => {
  const { lobby } = props;
  const navigate = useNavigate();
  const [chosenOne, setChosenOne] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({
    border: "solid black 2px",
  });
  const [nextView, setNextView] = useState(false);

  useEffect(() => {
    console.log(updateAnswers())
    setAnswers(updateAnswers());
  }, [lobby])


  const handleClick = (number) => {
    setChosenOne(number);

    setTimeout(() => setNextView(true), 3000);
  }

  const updateAnswers = () => {
    let allAnswers = [];

    // Add the main answer to the array
    allAnswers.push({id: 0, solution: lobby.game_details.solution});

    // Loop through each player in the lobby
    for (let i = 0; i < lobby.game_details.players.length; i++) {
      // Add each player's single answer to the array
      allAnswers.push(lobby.game_details.players[i].definition);
    }
    return _.shuffle(allAnswers)
  }

  return (
    <div id="hero">
      <div className="flex flex-col bg-neutral-100 shadow-md w-2/3 h-4/5 p-5 rounded-lg" id="gameVoting">
        <div className="flex mb-10 h-1/6 bg-supporange-200 rounded-md p-4 justify-center items-center">
          <p className="text-center text-xl">
            {lobby.game_details.challenge}
          </p>
        </div>
        <h1 className="text-xl">Select an answer:</h1>
        <div className="grow grid grid-cols-2 grid-rows-3 gap-8 mt-6" key={nextView}>
          {answers.map((answer, index) => (
            <AnswerBlock key={index} answer={answer} func={() => handleAnswerClick(answer)} />
          ))}
          {/* {!nextView ? <>
            <AnswerBlock answer="Don de la Vega" func={() => { }} />
            <AnswerBlock answer="Grilled Cheese" func={() => { }} />
            <AnswerBlock answer="Spanish Inquisition" func={() => handleClick(3)} style={chosenOne === 3 ? selectedStyle : null} />
            <AnswerBlock answer="A fancy hat" func={() => { }} />
            <AnswerBlock answer="None of your business" func={() => { }} />
            <AnswerBlock answer="Banana" func={() => { }} />
          </> : <>
            <AnswerBlock answer="Don de la Vega" func={() => navigate("/game3")} />
            <AnswerBlock answer="Grilled Cheese" votingPlayers={[{ name: "Hu", feature: "/assets/Ava3.jpg" }]} func={() => { }} />
            <AnswerBlock answer="Spanish Inquisition" style={{ backgroundColor: "green", border: "solid black 2px", }} votingPlayers={[{ name: "Juan", feature: "/assets/Ava1.jpg" }, { name: "Hans", feature: "/assets/Ava2.jpg" }]} func={() => { }} />
            <AnswerBlock answer="A fancy hat" func={() => { }} />
            <AnswerBlock answer="None of your business" func={() => { }} />
            <AnswerBlock answer="Banana" votingPlayers={[{ name: "Han", feature: "/assets/Ava4.jpg" }, { name: "H", feature: "/assets/Ava6.jpg" }]} func={() => { }} />
          </>
          } */}
        </div>
      </div>
    </div>
  );
};


Voting.propTypes = {
  lobby: PropTypes.object
};

export default Voting;
