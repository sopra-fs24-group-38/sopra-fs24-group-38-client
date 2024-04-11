import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Lobby from "../pages/Lobby";
import LobbyWaiting from "../pages/LobbyWaiting";
import StyleGuide from "../../styles/StyleGuide";
import NotFound from "../pages/NotFound";
import Game from "../pages/Game";
import GameVoting from "../pages/GameVoting";
import GameScores from "../pages/GameScores";


const AppRouter = () => {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/lobby" element={<Lobby />} />

        <Route path="/game" element={<Game />} />
        <Route path="/game2" element={<GameVoting />} />
        <Route path="/game3" element={<GameScores />} />
        {/* add route guard for/with WS checks. Include game paths here */}
        <Route path="/lobby/:id" element={<LobbyWaiting />} />

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/style" element={<StyleGuide />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
