import React from "react";

const WebSocketContext = React.createContext({
  conncetion: null,
  isRunning: false,
  setIsRunning: () => {},
});

export default WebSocketContext;
