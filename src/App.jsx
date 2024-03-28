import AppRouter from "./components/router/AppRouter";
import "./styles/global.scss";
import React, { createContext, useEffect, useState } from "react";
import { getWsUrl } from "./utils/getDomain";
import { Client } from '@stomp/stompjs';
import StandardErrorBoundary from "./utils/ErrorBoundary";
require("./utils/websockets");
export const WebSocketContext = createContext(null);
const App = () => {

    const [connections, setConnections] = useState({
        stompConnection: new Client({
            brokerURL: getWsUrl() + '/game'
        })
    })
    useEffect(() => {
        //Here we activate the stomp connection only needed to call once.
        connections.stompConnection.activate();
    }, [connections.stompConnection])

    return(
        <WebSocketContext.Provider value={connections}>
            <div>
                <StandardErrorBoundary>
                    <AppRouter />
                </StandardErrorBoundary>
            </div>
        </WebSocketContext.Provider>
  );
};

export default App;
