import React from "react";
import SxyButton from "../ui/SxyButton";
import PropTypes from "prop-types";


const Rules = ({ close }) => {

  return (
    <div id="rules">
      <SxyButton
        func={close}
        text="X"
        color={"red"}
        width="33px"
      />

      <h1 className="text-center my-10 text-5xl font-semibold">Rules</h1>

      <p>Requirements: <b>2 - 5</b> players</p>
      <br />
      <p>The game is playable anywhere between 5 - 15 rounds.</p>
      <p>Only the host can change the settings.</p>
      <br /><br />

      <h2>Game loop</h2>
      <br />
      <p>Every round there is an expression or phrase that is presented.
      The task at hand is to fool your friends by delivering an explanation for said word/phrase that might be plausible.{" "}
      <b>But</b> you are not allowed to give the correct explanation if you know it!
      </p>
      <br />
      <p>After everyone has submitted their answer we change to the voting phase where all player answers + the correct one are shown.</p>
      <p>You can gain points for either getting the right answer (+2) and/or fooling your friends (+1 per fooled friend).</p>
      <br />
      <p>After the voting you can see if you answered correctly or if you&apos;ve been fooled and by whom.</p>
      <p>The final phase of the loop is a scoreboard where every player is listed with their respective scores.</p>
      <br />
      <p>After the last round the scores are tallied one last time and a leaderboard is shown.</p>

      <br /><br />
      <h2>Different game modes</h2>
      <br />
      <p>There are currently 3 different game modes available:</p>
      <ul>
        <li>Definitions: abstract words that are not well known</li>
        <li>Dutch: actual Dutch</li>
        <li>Urban dictionary: slang words and metaphors</li>
      </ul>
    </div>
  );
};

Rules.propTypes = {
  close: PropTypes.func
};

export default Rules;
