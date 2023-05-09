import { engine } from "./Engine.js";

export class TTT extends engine {
  constructor() {
    super();
    this.initialize(3 , 3);
  }

  board_additions() {
    const board = document.querySelector("#board");
    board.style.width = "255px";
    board.style.textAlign = "center";
    board.style.margin = "auto";
    board.style.color = "white";
    board.style.marginTop = "100px";
  }
  cell_additions() {
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.width = "80px";
      cells[i].style.height = "80px";
      cells[i].style.float = "left";
      cells[i].style.backgroundColor = "gray";
      cells[i].style.margin = "2px";
      cells[i].style.fontSize = "55px";
      cells[i].style.fontFamily = "cursive";
    }
  }
  input_take() {
      const input1 = prompt('Enter the input: 1a:3c');
      let row = input1.charCodeAt(0) - 49;
      let col = input1.charCodeAt(1) - 97;
      let input = { r: -1, c: -1 };
      input.r = row;
      input.c = col;
      return input;
  }

  drawer(grid) {
    this.board_additions();
    this.cell_additions();
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      const row = cells[i].dataset.row;
      const col = cells[i].dataset.col;
      console.log(row , col);
      cells[i].textContent = grid[row][col];
    }
  }

  input_validation(grid , input , turn) {
    let row = input.r;
    let col = input.c;
    let valid;
    if(row > 2 || col > 2 || row < 0 || col < 0) {
      valid = false;
    }
    else {
      if (grid[row][col] != ' ') {
        valid = false;
      } else {
        if (turn === 1) {
          grid[row][col] = "X";
        } else if (turn === 2) {
          grid[row][col] = "O";
        }
        valid = true;
      }
    }
    return valid;
  }

  // swap_turn(turn) {
  //   if (turn === 1) {
  //     turn = 2;
  //   } else if (turn === 2) {
  //     turn = 1;
  //   }
  //   return turn;
  // }
  
  controller(grid , input , turn) {
    let valid = this.input_validation(grid , input , turn);
    if (valid == true) {
      this.drawer(grid);
      return true;
    } else {
      alert("Invalid input");
    }
  }
}
