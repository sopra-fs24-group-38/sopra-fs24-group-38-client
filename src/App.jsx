import React from "react";
import AppRouter from "./components/router/AppRouter";
import "./styles/global.scss";

const App = () => {
  return(
    <div className="h-dvh w-screen">
      <AppRouter />
    </div>
  );
};

export default App;