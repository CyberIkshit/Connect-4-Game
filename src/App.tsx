import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import StartPage from "./Components/StartGame";
import { HashRouter as Router, Route, Link, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import { PlayersContext } from "./Contexts/PlayersContext";

function App() {
  const [playersInfo, setPlayersInfo] = useState({
    player1Name: "",
    player2Name: "",
  });
  return (
    <div className="App">
      <Router>
        <PlayersContext.Provider value={{ playersInfo, setPlayersInfo }}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/start" element={<HomePage />} />
          </Routes>
        </PlayersContext.Provider>
      </Router>
    </div>
  );
}

export default App;
