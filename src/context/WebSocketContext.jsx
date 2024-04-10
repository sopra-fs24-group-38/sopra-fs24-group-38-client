import React, { createContext, useContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { getWsUrl } from "../utils/getDomain";

const WebSocketContext = createContext(null);

export const useWebSocketContext = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const socketUrl = getWsUrl();
    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(socketUrl, {
        onOpen: () => console.log('WebSocket opened'),
        shouldReconnect: (closeEvent) => true,
    });




    return (
        <WebSocketContext.Provider value={{ sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState }}>
            {children}
        </WebSocketContext.Provider>
    );
};
