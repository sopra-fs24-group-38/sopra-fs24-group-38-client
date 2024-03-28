import React from "react";

const SxyInput = ({label, value, color, func}) => {

  return(
    <div className="flex flex-col justify-center">
      <label className="font-medium mb-2">{label}</label>
      <input
        className="mb-5 h-9 pl-4 rounded-xl border-none bg-white opacity-85"
        style={{backgroundColor: color}}
        placeholder="enter here.."
        value={value}
        onChange={(e) => func(e.target.value)}
      />
    </div>
  );
};

export default SxyInput;
