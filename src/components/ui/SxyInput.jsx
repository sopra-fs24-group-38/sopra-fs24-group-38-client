import React from "react";

const SxyInput = ({label, value, color, func, enterKey=null, type="text", inputMode, maxLength, placeholder="enter here.."}) => {
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
        onKeyDown={enterKey ? handleKeyDown : null}
        onChange={(e) => func(e.target.value)}
      />
    </div>
  );
};

export default SxyInput;
