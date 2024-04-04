import AppRouter from "./components/router/AppRouter";
import "./styles/global.scss";
import React from "react";
import WebSocketProvider from "./context/WebSocketProvider";


const App = () => {
  return(
    <div className="h-dvh w-screen">
      <WebSocketProvider>
        <AppRouter />
      </WebSocketProvider>
    </div>
  );
};

export default App;
