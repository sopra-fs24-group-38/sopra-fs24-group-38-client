import React, { useState } from "react";
import PropTypes from "prop-types"
import SxyInput from "../ui/SxyInput";
import SxyButton from "../ui/SxyButton";
import useFeedback from "../../hooks/useFeedback";
import { api, handleError } from "../../utils/api";


const Definition = (props) => {
  const { lobby } = props;
  const feedback = useFeedback()
  const [submission, setSubmission] = useState("");
  const [definition, setDefinition] = useState(false);

  const sendDefinition = async () => {
    try {
      const headers = { "Authorization": localStorage.getItem("token") };
      const response = await api.put("/lobbies/users/definitions", { definition: submission }, { headers }); //${localStorage.getItem("pin")}
      console.log(response.data)
      setDefinition(true);

    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
    }

  }

  return (
    <div className="bg-neutral-400 justify-center" id="hero">
      <div className="bg-neutral-100 flex flex-col shadow-md w-2/3 h-1/2 rounded-md p-5" id="gameQuestion">
        <div className="flex grow mb-8 bg-supporange-200 rounded-md p-4 justify-center items-center">
          <p className="text-center text-2xl">
            {lobby.game_details.challenge}
          </p>
        </div>
        <SxyInput
          label={"Fool your friends"}
          value={submission}
          func={(n) => setSubmission(n)}
        />
        <SxyButton
          text="Send"
          color={"#731224"}
          disabled={definition}
          func={() => sendDefinition()}
        />
      </div>
    </div>
  );
};


Definition.propTypes = {
  lobby: PropTypes.object
};


export default Definition;
