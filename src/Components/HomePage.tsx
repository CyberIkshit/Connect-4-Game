import React, { useContext, useEffect, useState } from "react";
import Board from "./Board";
import { PlayersInfo } from "./StartGame";
import Player2Avatar from "../images/avatar02 1.png";
import Player1Avatar from "../images/Group 13.png";
import { useNavigate } from "react-router-dom";
import { PlayersContext } from "../Contexts/PlayersContext";
import { GameContext } from "../Contexts/GameContext";
export enum Player {
  None = -1,
  Player1 = 1,
  Player2 = 2,
}
function Users(props: any) {
  const { playersInfo }: any = useContext(PlayersContext);
  const { currentPlayer }: any = useContext(GameContext);
  return (
    <div className="playerCards">
      <div className="player1">
        <img
          src={Player1Avatar}
          style={
            currentPlayer === Player.Player1
              ? {
                  border: "0.5vw solid orange",
                }
              : { marginLeft: "1.5vw" }
          }
        />
        <div>
          <p>Player 01</p>
          <p>{playersInfo.player1Name}</p>
        </div>
        <div>
          <p>Score</p>
          <p>{props.player1}</p>
        </div>
      </div>
      <div className="player2">
        <img
          src={Player2Avatar}
          style={
            currentPlayer === Player.Player2
              ? {
                  border: "0.5vw solid orange",
                }
              : { marginLeft: "1.5vw" }
          }
        />
        <div>
          <p>Player 02</p>
          <p>{playersInfo.player2Name}</p>
        </div>
        <div>
          <p>Score</p>
          <p>{props.player2}</p>
        </div>
      </div>
    </div>
  );
}
function Message(params: any) {
  if (params.msg.length > 0) return <div className="message">{params.msg}</div>;
  else return null;
}
export default function HomePage() {
  const [winner, setWinner] = useState(Player.None);
  const [currentPlayer, setCurrentPlayer] = useState(Player.None);

  const [button1Text, setButtonText] = useState("Start Game");
  const [message, setMessage] = useState("");
  const [curGameSeq, setGameSeq] = useState(1);

  const [playerScores, setPlayerScores] = useState({ player1: 0, player2: 0 });
  const [undo, doUndo] = useState(false);
  const navigate = useNavigate();

  const { playersInfo }: any = useContext(PlayersContext);
  const button1OnClick = () => {
    let firstPlayerToStart = Math.floor(Math.random() + 1.5);
    if (curGameSeq == 3 && winner != Player.None) {
      setWinner(Player.None);
      setCurrentPlayer(firstPlayerToStart);
      setButtonText("Undo Step");
      setMessage("");
      setGameSeq(1);
      setPlayerScores({ player1: 0, player2: 0 });
    } else if (currentPlayer === Player.None) {
      setCurrentPlayer(firstPlayerToStart);
      setButtonText("Undo Step");
    } else {
      doUndo(true);
      setTimeout(() => doUndo(false), 500);
    }
  };

  const endTournament = () => {
    setMessage("Tournament Ended!");
    let path = `/`;
    setTimeout(() => navigate(path), 1000);
  };

  useEffect(() => {
    if (currentPlayer !== Player.None && winner != Player.None) {
      if (winner === Player.Player1) {
        setPlayerScores({
          player1: playerScores.player1 + 1,
          player2: playerScores.player2,
        });
        setMessage(
          `Congratulations ${playersInfo.player1Name}, you won Game ${curGameSeq}!!`
        );
      } else if (winner === Player.Player2) {
        setPlayerScores({
          player1: playerScores.player1,
          player2: playerScores.player2 + 1,
        });
        setMessage(
          `Congratulations ${playersInfo.player2Name}, you won Game ${curGameSeq}!!`
        );
      }

      if (curGameSeq < 3) {
        setGameSeq(curGameSeq + 1);
        setWinner(Player.None);
      } else {
        setMessage(
          `Congratulations ${
            playerScores.player1 > playerScores.player2
              ? playersInfo.player1Name
              : playersInfo.player2Name
          }, you won the tournament!!!`
        );
        setButtonText("Start New Game");
      }
    }
  }, [winner]);
  return (
    <div className="homePage">
      <GameContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
        <Board winner={winner} setWinner={setWinner} undoClicked={undo} />
        <div className="gameInfo">
          <h1>3 Games Tournament</h1>
          <Message msg={message} />
          <div className="status">Playing Game {curGameSeq}</div>
          <Users {...playerScores} />
          <div className="divider"></div>
          <button className="startButton" onClick={() => button1OnClick()}>
            {button1Text}
          </button>
          <button className="endButton" onClick={() => endTournament()}>
            End Tournament
          </button>
        </div>
      </GameContext.Provider>
    </div>
  );
}
