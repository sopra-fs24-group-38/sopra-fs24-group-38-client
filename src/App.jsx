import AppRouter from "./components/router/AppRouter";
import "./styles/global.scss";
import React from "react";
import WebSocketProvider from "./context/WebSocketProvider";


const App = () => {
  return(
    <WebSocketProvider>
      <AppRouter />
    </WebSocketProvider>
  );
};

export default App;
