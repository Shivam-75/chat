import React from "react";
import Chat from "./Chat";
import "./css/chat.css";
import Nav from "./Nav";
import { Route, Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/"
          element={
            <h1
              style={{
                textAlign: "center",
                marginTop: "322px",
                textTransform: "capitalize",
              }}>
              home page
            </h1>
          }
        />
        <Route
          path="/service"
          element={
            <h1
              style={{
                textAlign: "center",
                marginTop: "322px",
                textTransform: "capitalize",
              }}>
              service page
            </h1>
          }
        />
        <Route
          path="/about"
          element={
            <h1
              style={{
                textAlign: "center",
                marginTop: "322px",
                textTransform: "capitalize",
              }}>
              About page
            </h1>
          }
        />
      </Routes>
    </>
  );
};

export default App;
