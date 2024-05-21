import React from "react";
import SxyButton from "../ui/SxyButton";


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
      <p>The game is playable anywhere between 3 - 15 rounds.</p>
      <p><u>Only the host</u> can change the settings and add/remove AI players. There may not be more than 2 AI players in any lobby.</p>
      <br />

      <b><p className="text-red-600">IMPORTANT: adding multiple AI players and choosing multiple different modes increases the time the game needs to prepare. This is just a heads up, it does work :)</p></b>
      <br />

      <h2>Game loop</h2>
      <br />
      <p>Every round there is an expression or phrase that is presented.
      The task at hand is to fool your friends by delivering an explanation for said word/phrase that might be plausible.
      <br />
      <b>But</b> you are not allowed to give the correct explanation if you know it!
      </p>
      <br />
      <p>After everyone has submitted their answer we change to the voting phase where all player answers + the correct one are shown.</p>
      <p>You can gain points for either getting the right answer (+1) and/or fooling your friends (+2 per fooled friend).</p>
      <br />
      <p>After the voting you can see if you answered correctly or if you&apos;ve been fooled and by whom.</p>
      <p>The final phase of the loop is a scoreboard where every player is listed with their respective scores.</p>
      <br />
      <p>After the last round the scores are tallied one last time and a leaderboard is shown.</p>

      <br /><br />
      <h2>Different game modes</h2>
      <br />
      <p>There are currently 4 different game modes available:</p>
      <ul>
        <li><b>Bizzare</b>: abstract words that are not well known</li>
        <li><b>Dutch</b>: actual Dutch</li>
        <li><b>Programming</b>: words that pertain to the programming domain</li>
        <li><b>Rare Foods</b>: foods and dishes from around the globe</li>
      </ul>
      <br />
      <p>You can mix and match the modes to your liking. They will be evenly distributed across the selected modes divided by the round count.</p>
      <br />
      <p>You can hide the origin of the challenge word (which mode it came from) to increase the difficulty.</p>
    </div>
  );
};

export default Rules;
