import Player2Avatar from "../images/avatar02 1.png";
import Player1Avatar from "../images/Group 13.png";
import EmptyCell from "../images/Ellipse 8.png";
import { Component, useContext, useEffect, useState } from "react";
import { Player } from "./HomePage";
import { GameContext } from "../Contexts/GameContext";

function initializeGame() {
  let initial: any = {};
  for (var c = 0; c < 8; c++) {
    initial[c] = [
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
    ];
  }
  return initial;
}
function GameColumn(params: any) {
  return (
    <div className="game-column">
      {params.col.map(
        (
          cell:
            | boolean
            | React.ReactChild
            | React.ReactFragment
            | React.ReactPortal
            | null
            | undefined,
          x: any
        ) => {
          return (
            <span className="cell" key={x} onClick={params.onClick}>
              <BoardCell value={cell} />
            </span>
          );
        }
      )}
    </div>
  );
}

function BoardCell(params: any) {
  let imgSrc = "";
  if (params.value === Player.None) {
    imgSrc = `${EmptyCell}`;
  } else if (params.value === Player.Player1) imgSrc = `${Player1Avatar}`;
  else if (params.value === Player.Player2) imgSrc = `${Player2Avatar}`;
  return <img src={imgSrc} />;
}
interface Props {
  setWinner: (x: Player) => void;
  winner: Player;
  undoClicked: Boolean;
}
function Board(props: Props) {
  const [gameState, setGameState] = useState(initializeGame);
  const [lastMove, setLastMove] = useState(-1);
  const { currentPlayer, setCurrentPlayer }: any = useContext(GameContext);
  useEffect(() => {
    if (props.undoClicked === true && lastMove !== -1) {
      const column = gameState[lastMove];
      let piecePos = column.indexOf(Player.None);
      if (piecePos === -1) piecePos = 7;
      else piecePos--;

      if (
        piecePos >= 0 &&
        currentPlayer !== Player.None &&
        props.winner === Player.None
      ) {
        setCurrentPlayer(column[piecePos]);
        column[piecePos] = Player.None;
        setGameState({
          ...gameState,
          [lastMove]: column,
        });
      }
      setLastMove(-1);
    }
  }, [props.undoClicked]);

  const makeMove = (col: number) => {
    const column = gameState[col];
    setLastMove(col);
    const piecePos = column.indexOf(Player.None);
    if (
      piecePos >= 0 &&
      currentPlayer !== Player.None &&
      props.winner === Player.None
    ) {
      column[piecePos] = currentPlayer;
      setGameState({
        ...gameState,
        [col]: column,
      });
      if (gameOver()) {
        props.setWinner(currentPlayer);
        setGameState(initializeGame);
        // setTimeout(() => setGameState(initializeGame), 3000);
      } else
        setCurrentPlayer(
          currentPlayer === Player.Player1 ? Player.Player2 : Player.Player1
        );
    }
  };

  const gameOver = () => {
    // Check if there are any four in a row in a column
    for (var c = 0; c < 7; c++) {
      for (var r = 0; r < 6 - 3; r++) {
        if (
          gameState[c][r] != Player.None &&
          gameState[c][r] == gameState[c][r + 1] &&
          gameState[c][r + 1] == gameState[c][r + 2] &&
          gameState[c][r + 2] == gameState[c][r + 3]
        ) {
          return true;
        }
      }
    }

    // Check if there are any four in a row in a row
    for (c = 0; c < 7 - 3; c++) {
      for (r = 0; r < 6; r++) {
        if (
          gameState[c][r] != Player.None &&
          gameState[c][r] == gameState[c + 1][r] &&
          gameState[c + 1][r] == gameState[c + 2][r] &&
          gameState[c + 2][r] == gameState[c + 3][r]
        ) {
          return true;
        }
      }
    }

    // Check if there are any four diagonal up to the right
    for (c = 0; c < 7; c++) {
      for (r = 0; r < 6; r++) {
        if (
          gameState[c][r] != Player.None &&
          gameState[c][r] == gameState[c + 1][r + 1] &&
          gameState[c + 1][r + 1] == gameState[c + 2][r + 2] &&
          gameState[c + 2][r + 2] == gameState[c + 3][r + 3]
        ) {
          return true;
        }
      }
    }

    // Check if there are any four diagonal down to the right
    for (c = 0; c < 7; c++) {
      for (r = 5; r >= 3; r--) {
        if (
          gameState[c][r] != Player.None &&
          gameState[c][r] == gameState[c + 1][r - 1] &&
          gameState[c + 1][r - 1] == gameState[c + 2][r - 2] &&
          gameState[c + 2][r - 2] == gameState[c + 3][r - 3]
        ) {
          return true;
        }
      }
    }

    return false;
  };
  return (
    <div className="board">
      {Object.entries(gameState).map(([k, col], x) => {
        return (
          <GameColumn
            col={col}
            idx={x}
            onClick={() => makeMove(x)}
            key={`${x}-col`}
          />
        );
      })}
    </div>
  );
}
export default Board;
