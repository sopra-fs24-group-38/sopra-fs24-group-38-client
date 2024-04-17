import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import SxyButton from "../ui/SxyButton";
import "../../styles/Hero.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return(
    <div>
      <Header />
      <div className="bg-neutral-400" id="hero">
        <div className="p-10 bg-neutral-400 rounded-lg flex flex-col items-center">
          <h1 className="text-2xl mb-6">Whoops, that did not work out.</h1>
          <SxyButton
            text="Back Home"
            color={"#72171D"}
            width="120px"
            func={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
