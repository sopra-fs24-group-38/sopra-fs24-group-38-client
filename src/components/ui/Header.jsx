import React from "react";
import SxyButton from "./SxyButton";
import "../../styles/Header.scss";
import { useNavigate } from "react-router-dom";

const Header = ({leave=false}) => {
  const navigate = useNavigate();

  const logout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    navigate("/login");

  }

  const showRules = () => {

  }

  return(
    <div className="flex justify-between px-8 py-6 items-center bg-brand-500" id="header">
      <SxyButton
        text="?"
        color={"#C2B199"}
        func={showRules}
      />
      {leave ?
      <SxyButton
        text="Logout"
        color={"#CC1F1D"}
        func={logout}
        width="100px"
        position={"row-reverse"}
      /> : <div />}
    </div>
  );
};

export default Header;
