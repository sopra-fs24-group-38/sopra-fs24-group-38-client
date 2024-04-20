import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AnswerBlock from "../ui/AnswerBlock";
import useFeedback from "../../hooks/useFeedback";
import { api, handleError } from "../../utils/api";


const Voting = (props) => {
  const { lobby, solution} = props;
  const navigate = useNavigate();
  const feedback = useFeedback()
  const [chosenOne, setChosenOne] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const [player, setPlayer] = useState({});
  const [selectedStyle, setSelectedStyle] = useState({
    border: "solid black 2px",
  });  
  const [solutionStyle, setSolutionStyle] = useState({
    background: "#01DF3A" 
  });
  const [selectSolutionStyle, setSelectSolutionStyle] = useState({
    background: "#01DF3A" ,
    border: "solid black 2px",
  });
  // useEffect(() => {
  //   setAnswers(initAnswers());
  //   setPlayer(lobby.game_details.players.find(p => p.id === parseInt(localStorage.getItem("id"))))
  // }, [])

  useEffect(() => {
    setPlayer(lobby.game_details.players.find(p => p.id === parseInt(localStorage.getItem("id"))))
  }, [lobby])

  useEffect(() => {
    setChosenOne(Object.is(player.votedForUserId, null) ? -1 : player.votedForUserId);
    if (player.votedForUserId !== null) {
      setAnswers(updateAnswers(answers));
    } else {
      setAnswers(initAnswers());
    }
  }, [player])

  const handleClick = (number) => {
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
    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
    }
  }


  const initAnswers = () => {
    let allAnswers = [];

    // Add the main answer to the array
    allAnswers.push({ id: 0, solution: lobby.game_details.solution });

    // Loop through each player in the lobby
    for (let i = 0; i < lobby.game_details.players.length; i++) {
      // Add each player's single answer to the array
      allAnswers.push({ id: lobby.game_details.players[i].id, solution: lobby.game_details.players[i].definition, voting: [] });
    }

    return _.shuffle(allAnswers)
  }

  const updateAnswers = (oldAnswers) => {
    let allAnswers = [];
    

    // Loop through each player in the lobby
    for (let i = 0; i < oldAnswers.length; i++) {

      let votes = [];
      lobby.game_details.players.forEach(player => {
        // Check if the votedForUserId is a valid id and not 0 or null
        if (player.votedForUserId === oldAnswers[i].id) {
          votes.push({ name: player.username, url: `/assets/Ava${player.avatarId}.jpg` })
        }
      });

      // Add each player's single answer to the array
      allAnswers.push({ id: oldAnswers[i].id, solution: oldAnswers[i].solution, voting: votes });
    }

    return allAnswers
  }

  return (
    <div className="bg-neutral-400 justify-center" id="hero">
      <div className="flex flex-col bg-neutral-100 shadow-md w-2/3 h-4/5 p-5 rounded-lg" id="gameVoting">
        <div className="flex mb-5 h-1/6 bg-supporange-200 rounded-md p-4 justify-center items-center">
          <p className="text-center text-xl">
            {lobby.game_details.challenge}
          </p>
        </div>
        <h1 className="text-xl">Select an answer:</h1>
        <div className="grow grid grid-cols-2 grid-rows-3 gap-5 mt-6" >
          {answers.map((answer, index) => {
            return (
              <AnswerBlock key={index} answer={answer.solution} votingPlayers={answer.voting} func={() => handleClick(answer.id)} style={(chosenOne === answer.id && solution && answer.id ===0) ? selectSolutionStyle : chosenOne === answer.id ? selectedStyle : (solution && answer.id ===0) ? solutionStyle : null} />
            )
          }
          )}
        </div>
      </div>
    </div>
  );
};


Voting.propTypes = {
  lobby: PropTypes.object
};

export default Voting;
