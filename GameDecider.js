import { TTT } from "./TTT.js";
import { Connect4 } from "./Connect4.js";
import { Chess } from "./Chess.js";
import { EightQueens } from "./EightQueens.js";
import { Sudoku } from "./Sudoku.js";
import { Checkers } from "./Checkers.js";

const text = localStorage.getItem("Game");
localStorage.removeItem("Game");
let title = document.querySelector("#title");
title.innerHTML = text;
let currentGame;
if (text === "Tic-Tac-Toe") {
  currentGame = new TTT();
} else if (text === "Chess") {
  currentGame = new Chess();
} else if (text === "Checkers") {
  currentGame = new Checkers();
} else if (text === "Connect4") {
  currentGame = new Connect4();
} else if (text === "Sudoku") {
  currentGame = new Sudoku();
} else if (text === "8-Queens") {
  currentGame = new EightQueens();
}
