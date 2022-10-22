import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import SetAvatar from "./pages/SetAvatar";
import WithPrivateRoute from "./utils/WithPrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/setavatar"
          element={
            <WithPrivateRoute>
              <SetAvatar />
            </WithPrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <WithPrivateRoute>
              <Chat />
            </WithPrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
