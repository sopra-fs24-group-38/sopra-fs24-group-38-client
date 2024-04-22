import React from "react";
import PropTypes from "prop-types";

const SxyInput = ({label, value, color, func, enterKey=null, type="text", inputMode, disabled=false, maxLength, placeholder="enter here..", max, min}) => {
  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      enterKey();
    }
  };

  return(
    <div className="flex flex-col justify-center">
      {label ? <label className="font-medium mb-2">{label}</label> : null}
      <input
        className="mb-5 h-9 pl-4 rounded-xl border-none bg-white opacity-85"
        style={{backgroundColor: color}}
        placeholder={placeholder}
        type={type}
        value={value}
        inputMode={inputMode}
        maxLength={maxLength}
        max={max}
        min={min}
        disabled = {disabled}
        onKeyDown={enterKey ? handleKeyDown : null}
        onChange={(e) => func(e.target.value)}
      />
    </div>
  );
};

SxyInput.propTypes = {
  label: PropTypes.string, 
  value: PropTypes.string, 
  color: PropTypes.string, 
  func: PropTypes.func, 
  enterKey: PropTypes.func, 
  type: PropTypes.string, 
  inputMode: PropTypes.string, 
  disabled: PropTypes.bool, 
  maxLength: PropTypes.number, 
  placeholder: PropTypes.string, 
  max: PropTypes.string, 
  min: PropTypes.string
};

export default SxyInput;
