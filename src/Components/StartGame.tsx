import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlayersContext } from "../Contexts/PlayersContext";
import Player2 from "../images/avatar02 1.png";
import Player1 from "../images/Group 13.png";
export interface PlayersInfo {
  [x: string]: any; //added later need to test
  player1Name: string;
  player2Name: string;
}
function StartPage() {
  const players: PlayersInfo = {
    player1Name: "",
    player2Name: "",
  };

  const { setPlayersInfo }: any = useContext(PlayersContext);

  let navigate = useNavigate();
  const startNewGame = () => {
    setPlayersInfo(players);
    let path = `/start`;
    navigate(path);
  };
  return (
    <div className="startPage">
      <div className="player1Card">
        <img src={Player1} />
        <div>
          <p>Player 01</p>
          <input
            type="text"
            onChange={(e) => (players.player1Name = e.target.value)}
            required
          ></input>
        </div>
      </div>
      <div className="player2Card">
        <img src={Player2} />
        <div>
          <p>Player 02</p>
          <input
            type="text"
            onChange={(e) => (players.player2Name = e.target.value)}
            required
          ></input>
        </div>
      </div>
      <div className="buttonStartGame">
        <input type="button" value="Start Game" onClick={startNewGame}></input>
      </div>
    </div>
  );
}

export default StartPage;
