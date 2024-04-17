import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AnswerBlock from "../ui/AnswerBlock";
import useFeedback from "../../hooks/useFeedback";
import { api, handleError } from "../../utils/api";


const Voting = (props) => {
  const { lobby, } = props;
  const navigate = useNavigate();
  const feedback = useFeedback()
  const [chosenOne, setChosenOne] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const [player, setPlayer] = useState({});
  const [selectedStyle, setSelectedStyle] = useState({
    border: "solid black 2px",
  });

  useEffect(() => {
    console.log(player)
    setAnswers(updateAnswers());
    setPlayer(lobby.game_details.players.find(p => p.id === parseInt(localStorage.getItem("id"))))
  }, [lobby])

  useEffect(() => {
    console.log(player.votedForUserId)
    setChosenOne(Object.is(player.votedForUserId, null) ? -1 : player.votedForUserId);
  }, [player])

  const handleClick = (number) => {
    console.log(player)
    // if player didnt vote yet
    if (player && player.votedForUserId === null) {
      if (player.id !== number) {
        setChosenOne(number);
        sendVote(number)

      }
    }
  }

  const sendVote = async (number) => {
    try {
      const headers = { "Authorization": localStorage.getItem("token") };
      const response = await api.put("/lobbies/users/votes", { vote: number }, { headers }); //${localStorage.getItem("pin")}
      console.log(response.data)
    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
    }
  }


  const updateAnswers = () => {
    let allAnswers = [];

    // Add the main answer to the array
    allAnswers.push({ id: 0, solution: lobby.game_details.solution });

    // Loop through each player in the lobby
    for (let i = 0; i < lobby.game_details.players.length; i++) {
      // Add each player's single answer to the array
      allAnswers.push({ id: lobby.game_details.players[i].id, solution: lobby.game_details.players[i].definition });
    }
    return _.shuffle(allAnswers)
  }

  return (
    <div className="bg-neutral-400 justify-center" id="hero">
      <div className="flex flex-col bg-neutral-100 shadow-md w-2/3 h-4/5 p-5 rounded-lg" id="gameVoting">
        <div className="flex mb-10 h-1/6 bg-supporange-200 rounded-md p-4 justify-center items-center">
          <p className="text-center text-xl">
            {lobby.game_details.challenge}
          </p>
        </div>
        <h1 className="text-xl">Select an answer:</h1>
        <div className="grow grid grid-cols-2 grid-rows-3 gap-8 mt-6" >
          {answers.map((answer, index) => {
            console.log(chosenOne)
            return (
              <AnswerBlock key={index} answer={answer.solution} func={() => handleClick(answer.id)} style={chosenOne === answer.id ? selectedStyle : null} />
            )
          }
          )}
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
