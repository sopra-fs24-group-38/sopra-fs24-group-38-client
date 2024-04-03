import React, { useState } from "react";
import WebSocketContext from "./WebSocketContext";
import { getWsUrl } from "./utils/getDomain";
import { Client } from "@stomp/stompjs";
require("./utils/websockets");


const WebSocketProvider = ({children}) => {
  const [isRunning, setIsRunning] = useState(false);
  // not entirely sure about the missing credentials, could be added later if needed
  const wsClient = new Client({
    brokerURL: getWsUrl() + "ws",
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  wsClient.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  }

  wsClient.onWebSocketClose = function() {
    console.log("Websocket connection closed");
    setIsRunning(false);
  }

  useEffect(() => {
    // activate the stomp connection, only need to call once
    wsClient.activate();
  }, []);


  return(
    <WebSocketContext.Provider value={{wsClient, isRunning, setIsRunning}}>
      {children}
    </WebSocketContext.Provider>
  );
}

export default WebSocketProvider;
