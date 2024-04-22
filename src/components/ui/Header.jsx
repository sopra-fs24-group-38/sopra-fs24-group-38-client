import React, { useState } from "react";
import SxyButton from "./SxyButton";
import { useNavigate } from "react-router-dom";
import { api, handleError } from "../../utils/api";
import useFeedback from "../../hooks/useFeedback";
import Rules from "./Rules";

import "../../styles/Header.scss";


const Header = ({ leave = false }) => {
  const navigate = useNavigate();
  const feedback = useFeedback();
  const [seeRules, setSeeRules] = useState(false);

  const logout = async () => {
    try {
      const headers = { "Authorization": localStorage.getItem("token") };
      const response = await api.get("/users/logout", { headers });
    } catch (e) {
      feedback.give(handleError(e), 3000, "error");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    navigate("/login");

  };


  return (
    <div className="flex justify-between px-6 py-6 items-center bg-brand-500" id="header">
      <SxyButton
        text="?"
        color={"#C2B199"}
        func={() => setSeeRules(prev => !prev)}
      />
      {leave ?
        <SxyButton
          text="Logout"
          color={"#CC1F1D"}
          func={logout}
          width="100px"
          position={"row-reverse"}
        /> : <div />}

      {seeRules ? <Rules close={() => setSeeRules(false)} /> : null}
    </div>
  );
};

export default Header;
