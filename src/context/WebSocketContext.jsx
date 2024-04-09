import React, { createContext, useContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const WebSocketContext = createContext(null);

export const useWebSocketContext = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const socketUrl = 'ws://localhost:8080/websockets';
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

    useEffect(() => {
        console.log('Received message:', lastMessage);
    }, [lastMessage]);


    return (
        <WebSocketContext.Provider value={{ sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState }}>
            {children}
        </WebSocketContext.Provider>
    );
};
