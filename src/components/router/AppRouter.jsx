import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Lobby from "../pages/Lobby";
import LobbyWaiting from "../pages/LobbyWaiting";
import StyleGuide from "../../styles/StyleGuide";


const AppRouter = () => {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/lobby" element={<Lobby />} />

        {/* add route guard for/with WS checks. Include game paths here */}
        <Route path="/lobby/:id" element={<LobbyWaiting />} />

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/style" element={<StyleGuide />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
