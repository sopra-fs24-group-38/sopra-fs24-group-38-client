import React from "react";
import PropTypes from "prop-types";

const SxyButton = ({text="-", color, width="100%", func, disabled, position}) => {

  return(
    <div className="flex" style={{flexDirection: position}}>
      <button className={`
        flex
        items-center
        justify-center
        text-white
        rounded-lg
        p-2
        font-semibold
        hover:scale-105
        hover:cursor-pointer
        disabled:cursor-default
        disabled:opacity-60
        disabled:hover:transform-none
        transition
        ease-in-out`}
      style={{backgroundColor: color, width: width}}
      disabled={disabled}
      onClick={() => func()}
      >
        {text}
      </button>
    </div>
  );
};

SxyButton.propTypes = {
  text: PropTypes.string, 
  color: PropTypes.string, 
  width: PropTypes.string, 
  func: PropTypes.func, 
  disabled: PropTypes.bool,
  position: PropTypes.string
};

export default SxyButton;
