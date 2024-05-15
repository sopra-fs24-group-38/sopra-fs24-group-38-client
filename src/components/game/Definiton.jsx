import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"
import SxyInput from "../ui/SxyInput";
import SxyButton from "../ui/SxyButton";
import useFeedback from "../../hooks/useFeedback";
import { api, handleError } from "../../utils/api";
import { toast } from "react-toastify";


const Definition = (props) => {
  const { lobby, prep, player } = props;
  const feedback = useFeedback()
  const [submission, setSubmission] = useState("");
  const [definition, setDefinition] = useState(false);

  useEffect(() => {
    toast.dismiss();
  }, [])

  useEffect(() => {
    if (player.definition) {
      setSubmission(player.definition)
      setDefinition(true)
    }
  }, [player])

  useEffect(() => {
    if (definition === true ) {
      prep.current = toast.loading("Waiting for remaining definitions");
    }
  }, [definition])

  const sendDefinition = async () => {
    if (submission.replace(" ", "") !== "") {
      try {
        const headers = { "Authorization": localStorage.getItem("nobody_is_perfect_token") };
        const response = await api.put("/lobbies/users/definitions", { definition: submission }, { headers }); //${localStorage.getItem("pin")}
        console.log(response.data)
        setDefinition(true);
      } catch (error) {
        feedback.give(handleError(error), 3000, "error");
      }
    } else {
      feedback.give("The submission cannot be empty!", 2500, "info");
    }
  }

  return (
    <div className="bg-neutral-400 justify-center" id="hero">
      <div className="bg-neutral-100 flex flex-col shadow-md max-w-sexy rounded-xl p-5" id="gameQuestion">
        <div className="flex flex-col mb-8 py-12 px-24 bg-supporange-200 rounded-md justify-center items-center">
          <p className="text-center text-2xl p-3">
            who or what is...
          </p>
          <p className="text-center text-2xl break-words">
            {lobby.game_details.challenge}
          </p>
        </div>
        <SxyInput
          label={"Fool your friends"}
          value={submission}
          maxLength={40}
          disabled={definition}
          enterKey={sendDefinition}
          func={(n) => setSubmission(n)}
        />
        <SxyButton
          text="Send"
          color={"#731224"}
          disabled={definition || !submission}
          func={sendDefinition}
        />
      </div>
    </div>
  );
};


Definition.propTypes = {
  lobby: PropTypes.object,
  prep: PropTypes.object
};


export default Definition;
