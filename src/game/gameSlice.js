import { createSlice } from "@reduxjs/toolkit";
import calculateWinner from "./calculateWinner";

function turnPlayer(turn) {
  if (turn % 2 == 0) return "O";
  return "X";
}

function deepCopy(reference) {
  return JSON.parse(JSON.stringify(reference));
}

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    history: [
      Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null)),
    ],
    turn: 1,
  },
  reducers: {
    play: ({ turn, history }, { type, payload }) => {
      let update = deepCopy(history);
      const lastIndex = update.length - 1;
      const winner = calculateWinner(update[lastIndex]);
      const { rpos, cpos } = payload;
      if (!update[lastIndex][rpos][cpos] && !winner) {
        update.push(deepCopy(update[lastIndex]));
        update[lastIndex + 1][rpos][cpos] = turnPlayer(turn);
        return {
          turn: turn + 1,
          history: update,
        };
      }
    },

    jumpTo: ({ turn, history }, { type, payload }) => {
      const target = payload.index;
      let update;
      if (target == 0) {
        update = [history[0]];
      } else {
        update = history.slice(0, target + 1);
      }
      return {
        turn: target + 1,
        history: update,
      };
    },
  },
});

export const { play, jumpTo } = gameSlice.actions;

export default gameSlice.reducer;
