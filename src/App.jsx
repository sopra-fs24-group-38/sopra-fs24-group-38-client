// src/App.js
import React from "react";
import AppRouter from "./components/router/AppRouter";
import "./styles/global.scss";
import { WebSocketProvider } from "./context/WebSocketContext"; 

const App = () => {
  return (
    <div className="h-dvh w-screen">
      <WebSocketProvider>
        <AppRouter />
      </WebSocketProvider>
    </div>
  );
};

export default App;
