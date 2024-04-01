import React from "react";
import useFeedback from "../hooks/useFeedback";
import SxyButton from "../components/ui/SxyButton";


const StyleGuide = () => {
  const feedback = useFeedback();

  const handleClick = () => {
    feedback.give("Hello Stefan\nWie stehts?", 2000, "success");
  }

  return(
    <div className="w-full h-full" id="style">
      <SxyButton color="darkred" text="Toast me" func={handleClick} width="100px" />
      <div className="flex mt-20 mx-24 gap-8 justify-between bg-white px-10 py-2 rounded h-96">
        <div className="flex-row h-10 gap-2 w-40">
          <h1 className="mb-4">Brand</h1>
          <div className="rounded-lg h-full w-full bg-brand-100" />
          <div className="rounded-lg h-full w-full bg-brand-200" />
          <div className="rounded-lg h-full w-full bg-brand-300" />
          <div className="rounded-lg h-full w-full bg-brand-400" />
          <div className="rounded-lg h-full w-full bg-brand-500" />
          <div className="rounded-lg h-full w-full bg-brand-600" />
          <div className="rounded-lg h-full w-full bg-brand-700" />
          <div className="rounded-lg h-full w-full bg-brand-800" />
          <div className="rounded-lg h-full w-full bg-brand-900" />
        </div>
        <div className="flex-row h-10 gap-2 w-40">
          <h1 className="mb-4">Contrast</h1>
          <div className="rounded-lg h-full w-full bg-contrast-100" />
          <div className="rounded-lg h-full w-full bg-contrast-200" />
          <div className="rounded-lg h-full w-full bg-contrast-300" />
          <div className="rounded-lg h-full w-full bg-contrast-400" />
          <div className="rounded-lg h-full w-full bg-contrast-500" />
          <div className="rounded-lg h-full w-full bg-contrast-600" />
          <div className="rounded-lg h-full w-full bg-contrast-700" />
          <div className="rounded-lg h-full w-full bg-contrast-800" />
          <div className="rounded-lg h-full w-full bg-contrast-900" />
        </div>
        <div className="flex-row h-10 gap-2 w-40">
          <h1 className="mb-4">Neutral</h1>
          <div className="rounded-lg h-full w-full bg-neutral-100" />
          <div className="rounded-lg h-full w-full bg-neutral-200" />
          <div className="rounded-lg h-full w-full bg-neutral-300" />
          <div className="rounded-lg h-full w-full bg-neutral-400" />
          <div className="rounded-lg h-full w-full bg-neutral-500" />
          <div className="rounded-lg h-full w-full bg-neutral-600" />
          <div className="rounded-lg h-full w-full bg-neutral-700" />
          <div className="rounded-lg h-full w-full bg-neutral-800" />
          <div className="rounded-lg h-full w-full bg-neutral-900" />
        </div>
        <div className="flex-row h-10 gap-2 w-40">
          <h1 className="mb-4">Support Gray</h1>
          <div className="rounded-lg h-full w-full bg-suppgray-100" />
          <div className="rounded-lg h-full w-full bg-suppgray-200" />
          <div className="rounded-lg h-full w-full bg-suppgray-300" />
          <div className="rounded-lg h-full w-full bg-suppgray-400" />
          <div className="rounded-lg h-full w-full bg-suppgray-500" />
          <div className="rounded-lg h-full w-full bg-suppgray-600" />
          <div className="rounded-lg h-full w-full bg-suppgray-700" />
          <div className="rounded-lg h-full w-full bg-suppgray-800" />
          <div className="rounded-lg h-full w-full bg-suppgray-900" />
        </div>
        <div className="flex-row h-10 gap-2 w-40">
          <h1 className="mb-4">Support Red</h1>
          <div className="rounded-lg h-full w-full bg-suppred-100" />
          <div className="rounded-lg h-full w-full bg-suppred-200" />
          <div className="rounded-lg h-full w-full bg-suppred-300" />
          <div className="rounded-lg h-full w-full bg-suppred-400" />
          <div className="rounded-lg h-full w-full bg-suppred-500" />
          <div className="rounded-lg h-full w-full bg-suppred-600" />
          <div className="rounded-lg h-full w-full bg-suppred-700" />
          <div className="rounded-lg h-full w-full bg-suppred-800" />
          <div className="rounded-lg h-full w-full bg-suppred-900" />
        </div>
        <div className="flex-row h-10 gap-2 w-40">
          <h1 className="mb-4">Support Green</h1>
          <div className="rounded-lg h-full w-full bg-suppgreen-100" />
          <div className="rounded-lg h-full w-full bg-suppgreen-200" />
          <div className="rounded-lg h-full w-full bg-suppgreen-300" />
          <div className="rounded-lg h-full w-full bg-suppgreen-400" />
          <div className="rounded-lg h-full w-full bg-suppgreen-500" />
          <div className="rounded-lg h-full w-full bg-suppgreen-600" />
          <div className="rounded-lg h-full w-full bg-suppgreen-700" />
          <div className="rounded-lg h-full w-full bg-suppgreen-800" />
          <div className="rounded-lg h-full w-full bg-suppgreen-900" />
        </div>
        <div className="flex-row h-10 gap-2 w-40">
          <h1 className="mb-4">Support Blue</h1>
          <div className="rounded-lg h-full w-full bg-suppblue-100" />
          <div className="rounded-lg h-full w-full bg-suppblue-200" />
          <div className="rounded-lg h-full w-full bg-suppblue-300" />
          <div className="rounded-lg h-full w-full bg-suppblue-400" />
          <div className="rounded-lg h-full w-full bg-suppblue-500" />
          <div className="rounded-lg h-full w-full bg-suppblue-600" />
          <div className="rounded-lg h-full w-full bg-suppblue-700" />
          <div className="rounded-lg h-full w-full bg-suppblue-800" />
          <div className="rounded-lg h-full w-full bg-suppblue-900" />
        </div>
        <div className="flex-row h-10 gap-2 w-40">
          <h1 className="mb-4 line-through">Support Orange</h1>
          <div className="rounded-lg h-full w-full bg-supporange-100" />
          <div className="rounded-lg h-full w-full bg-supporange-200" />
          <div className="rounded-lg h-full w-full bg-supporange-300" />
          <div className="rounded-lg h-full w-full bg-supporange-400" />
          <div className="rounded-lg h-full w-full bg-supporange-500" />
          <div className="rounded-lg h-full w-full bg-supporange-600" />
          <div className="rounded-lg h-full w-full bg-supporange-700" />
          <div className="rounded-lg h-full w-full bg-supporange-800" />
          <div className="rounded-lg h-full w-full bg-supporange-900" />
        </div>
        <div className="flex-row h-10 gap-2 w-40">
          <h1 className="mb-4">Support Purple</h1>
          <div className="rounded-lg h-full w-full bg-suppurple-100" />
          <div className="rounded-lg h-full w-full bg-suppurple-200" />
          <div className="rounded-lg h-full w-full bg-suppurple-300" />
          <div className="rounded-lg h-full w-full bg-suppurple-400" />
          <div className="rounded-lg h-full w-full bg-suppurple-500" />
          <div className="rounded-lg h-full w-full bg-suppurple-600" />
          <div className="rounded-lg h-full w-full bg-suppurple-700" />
          <div className="rounded-lg h-full w-full bg-suppurple-800" />
          <div className="rounded-lg h-full w-full bg-suppurple-900" />
        </div>
      </div>
    </div>
  );
};

export default StyleGuide;
