import React, { createContext } from "react";
import useWebSocket from "react-use-websocket";
import { getWsUrl } from "../utils/getDomain";
import useFeedback from "../hooks/useFeedback";
import { handleError } from "../utils/api";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const socketUrl = getWsUrl();
  const feedback = useFeedback();
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log("WebSocket opened"),
    onClose: () => console.log("WebSocket closed"),
    onError: (error) => feedback.give(handleError(error), 3000, "error"),
    shouldReconnect: (closeEvent) => {
      switch(closeEvent.code) {
      case 1000:
        // closed normally, do nothing
        return false;
      case 1001:
        // user either closed browser or disconnects, remove token
        // localStorage.removeItem("token");
        
        return false;
      case 1003:
        // reveived weird data
        console.log("WebSocket received unacceptable data");

        return true;
      default:
        return true;
      }
    },
  });


  return (
    <WebSocketContext.Provider value={{ sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext;
