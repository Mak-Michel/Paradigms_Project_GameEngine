import { engine } from "./Engine.js";

export class EightQueens extends engine {
  constructor() {
    super();
    this.initialize(10, 10);
  }
  board_additions() {
    const board = document.querySelector("#board");
    board.style.width = "620px";
    board.style.textAlign = "center";
    board.style.margin = "auto";
    board.style.marginTop = "100px";
  }
  cell_additions() {
    var rowNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    var colLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const cells = document.querySelectorAll(".cell");
    let index = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        cells[index].style.width = "62px";
        cells[index].style.height = "62px";
        cells[index].style.float = "left";
        cells[index].style.fontSize = "50px";
        if (i == 0 || i == 9) {
          if (j > 0) {
            cells[index].textContent = colLetters[j - 1];
          }
          cells[index].style.backgroundColor = "brown";
          cells[index].style.border = "0px";
        } else {
          if (j == 0 || j == 9) {
            if (i > 0) {
              cells[index].textContent = rowNumbers[i - 1];
            }
            cells[index].style.backgroundColor = "brown";
            cells[index].style.border = "0px";
          } else {
            if ((i + j) % 2 == 0) {
              cells[index].style.backgroundColor = "grey";
            } else {
              cells[index].style.backgroundColor = "white";
            }
          }
        }
        index += 1;
      }
    }
  }

  input_take() {
    let input1 = prompt("Enter the position: 1a");
    let row = input1.charCodeAt(0) - 48;
    let col = input1.charCodeAt(1) - 96;
    let input = { r: -1, c: -1};
    input.r = row;
    input.c = col;
    return input;
  }

  drawer(grid) {
    this.board_additions();
    this.cell_additions();
    const cells = document.querySelectorAll(".cell");
    let index = 11;
    for (let i = 1; i < 9; i++) {
      for (let j = 1; j < 9; j++) {
        if (grid[i][j] == " ") {
          cells[index].textContent = grid[i][j];
        } else {
          cells[index].textContent = String.fromCharCode(grid[i][j]);
        }
        index++;
      }
      index += 2;
    }
  }

  input_validation(grid, input, turn) {
      let row = input.r;
      let col = input.c;
      let valid;
      if (row < 0 || row > 8 || col < 0 || col > 8) {
        valid = false;
      } else {
        if (grid[row][col] == 9813) {
          grid[row][col] = " ";
          valid = true;
          return valid;
        }
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            if (grid[i][j] == 9813) {
              if (
                Math.abs(i - row) === Math.abs(j - col) ||
                Math.abs(j - col) == 0 ||
                Math.abs(i - row) == 0
              ) {
                valid = false;
                return valid;
              }
            }
          }
        }
        grid[row][col] = 9813;
        valid = true;
      }
      return valid;
  }
  controller(grid, input, turn) {
    let valid = this.input_validation(grid, input, turn);
    if (valid == true) {
      this.drawer(grid);
      return true;
    } else {
      alert("Invalid place");
    }
  }
}
