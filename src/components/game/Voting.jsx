import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import AnswerBlock from "../ui/AnswerBlock";
import useFeedback from "../../hooks/useFeedback";
import { api, handleError } from "../../utils/api";
import { toast } from "react-toastify";


const Voting = (props) => {
  const { lobby, solution, prep } = props;
  const feedback = useFeedback();
  const [chosenOne, setChosenOne] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const [player, setPlayer] = useState({});
  const selectedStyle = {
    border: "solid black 2px",
  };
  const solutionStyle = {
    background: "#01DF3A"
  }
  const selectSolutionStyle = {
    background: "#01DF3A",
    border: "solid black 2px",
  }
  const ownAnswerStyle = {
    background: "#a5987fbf",
  }

  useEffect(() => {
    toast.update(prep.current, {
      render: "Please vote your answer.",
      type: "info",
      theme: "colored",
      autoClose: 2000,
      isLoading: false,
    })
  }, [])

  useEffect(() => {
    console.log(lobby)
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
    if ((player && player.votedForUserId === null) && (chosenOne < 0)) {
      if (player.id !== number) {
        setChosenOne(number);
        sendVote(number)

        prep.current = toast.loading("Waiting for remaining votes");
      }
    }
  }

  const sendVote = async (number) => {
    try {
      const headers = { "Authorization": localStorage.getItem("token") };
      await api.put("/lobbies/users/votes", { vote: number }, { headers }); //${localStorage.getItem("pin")}
    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
    }
  }


  const initAnswers = () => {
    let allAnswers = [];

    // Add the main answer to the array
    allAnswers.push({ id: 0, solution: lobby.game_details.solution });

    // Loop through each player in the lobby
    for (let answer of lobby.game_details.players) {
      // Add each player's single answer to the array
      allAnswers.push({ id: answer.id, solution: answer.definition, voting: [] });
    }

    return _.shuffle(allAnswers)
  }

  const updateAnswers = (oldAnswers) => {
    let allAnswers = [];


    // Loop through each player in the lobby
    for (let answer of oldAnswers) {
      let votes = [];
      lobby.game_details.players.forEach(player => {
        // Check if the votedForUserId is a valid id and not 0 or null
        if (player.votedForUserId === answer.id) {
          votes.push({ name: player.username, url: `/assets/Ava${player.avatarId}.jpg` })
        }
      });

      // Add each player's single answer to the array
      allAnswers.push({ id: answer.id, solution: answer.solution, voting: votes });
    }

    return allAnswers
  }

  return (
    <div className="bg-neutral-400 justify-center" id="hero">
      <div className="flex flex-col bg-neutral-100 shadow-md p-5 rounded-lg max-w-sexy" id="gameVoting">
        <div className="flex mb-5 h-1/6 bg-supporange-200 rounded-md p-4 justify-center items-center" id="votingQuestion">
          <p className="text-center text-xl p-4">
            {lobby.game_details.challenge}
          </p>
        </div>
        <h1 className="text-xl">Select an answer:</h1>
        <div className="grow grid grid-cols-2 gap-5 mt-6" id="answers" >
          {answers.map((answer, index) => {
            return (
              <AnswerBlock key={answer.id} answer={answer.solution} votingPlayers={answer.voting} func={() => handleClick(answer.id)}
                style={answer.id === player.id ? ownAnswerStyle :
                  (chosenOne === answer.id && solution && answer.id === 0) ?
                    selectSolutionStyle : chosenOne === answer.id ?
                      selectedStyle : (solution && answer.id === 0) ?
                        solutionStyle : null} />
            )
          }
          )}
        </div>
      </div>
    </div>
  );
};


Voting.propTypes = {
  lobby: PropTypes.object,
  solution: PropTypes.bool,
  prep: PropTypes.object
};

export default Voting;
