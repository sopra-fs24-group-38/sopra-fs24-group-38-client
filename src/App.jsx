import AppRouter from "./components/router/AppRouter";
import "./styles/global.scss";
import React from "react";


const App = () => {
  return(
    <div className="h-dvh w-screen">
        <AppRouter />
    </div>
  );
};

export default App;
