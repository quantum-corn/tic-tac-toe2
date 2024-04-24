import { useSelector, useDispatch } from "react-redux";
import { play, jumpTo } from "./gameSlice";
import calculateWinner from "./calculateWinner";
import "./Game.css";

function Tile({ rpos, cpos }) {
  const dispatch = useDispatch();
  const turn = useSelector((state) => state.game.turn);
  const game = useSelector((state) => state.game.history[turn - 1]);
  return (
    <button className="Tile" onClick={() => dispatch(play({ rpos, cpos }))}>
      {game[rpos][cpos]}
    </button>
  );
}

function Row({ rpos }) {
  return (
    <div className="Row">
      {[0, 1, 2].map((cpos) => (
        <Tile key={cpos} rpos={rpos} cpos={cpos} />
      ))}
    </div>
  );
}

function Board() {
  return (
    <div className="Board">
      {[0, 1, 2].map((rpos) => (
        <Row key={rpos} rpos={rpos} />
      ))}
    </div>
  );
}

function History() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.game.history);
  const moves = history.map((board, index) => {
    let description;
    if (index > 0) {
      description = "Go to move #" + index;
    } else {
      description = "Go to game start!";
    }
    return (
      <button key={index} onClick={() => dispatch(jumpTo({ index }))}>
        {description}
      </button>
    );
  });
  moves.pop();
  return <div className="History">{moves}</div>;
}

export default function Game() {
  const turn = useSelector((state) => state.game.turn);
  const game = useSelector((state) => state.game.history[turn - 1]);

  const winner = calculateWinner(game);
  let status;
  let player = turn % 2 == 0 ? "O" : "X";
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Player: " + player;
  }

  return (
    <div className="Game">
      <div className="Status">{status}</div>
      <Board />
      <History />
    </div>
  );
}
