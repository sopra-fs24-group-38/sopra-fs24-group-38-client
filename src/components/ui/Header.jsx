import React, { useState } from "react";
import SxyButton from "./SxyButton";
import { useNavigate } from "react-router-dom";
import { api, handleError } from "../../utils/api";
import useFeedback from "../../hooks/useFeedback";
import Rules from "./Rules";
import { toast } from "react-toastify";

import "../../styles/Header.scss";


const Header = ({ leave = false, quit = false }) => {
  const navigate = useNavigate();
  const feedback = useFeedback();
  const [seeRules, setSeeRules] = useState(false);

  const logout = async () => {
    try {
      const headers = { "Authorization": localStorage.getItem("nobody_is_perfect_token") };
      await api.get("/users/logout", { headers });
    } catch (e) {
      feedback.give(handleError(e), 3000, "error");
    }
    localStorage.removeItem("nobody_is_perfect_token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("pin");
    navigate("/login");

  };

  const leaveLobby = async () => {
    try {
      const headers = { "Authorization": localStorage.getItem("nobody_is_perfect_token") };
      await api.delete(`/lobbies/users/${localStorage.getItem("pin")}`, { headers });

      localStorage.removeItem("pin");
      toast.dismiss();
      navigate("/lobby");
    } catch (error) {
      feedback.give(handleError(error), 3000, "error");
    }
  };

  return (
    <div className="flex px-6 py-6" id="header">
      <div className="flex items-center gap-x-2 z-50">
        <SxyButton
          text="?"
          color={"#C2B199"}
          func={() => setSeeRules(prev => !prev)}
        />
        <h1 className="text-xl font-medium">Rules</h1>
      </div>
      {leave ?
        <div id="logout">
          <SxyButton
            text="Logout"
            color={"#CC1F1D"}
            func={logout}
            width="100px"
            position={"row-reverse"}
          />
        </div>
        : <div />}
      {quit ?
        <div id="logout" className="z-50">
          <SxyButton
            text="Quit"
            color={"#CC1F1D"}
            func={leaveLobby}
            width="100px"
            position={"row-reverse"} />
        </div>
        : <div />}

      {seeRules ? <Rules close={() => setSeeRules(false)} /> : null}
    </div>
  );
};

export default Header;
