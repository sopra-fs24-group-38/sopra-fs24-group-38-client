import React from "react";
import Login from "../pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


const AppRouter = () => {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
