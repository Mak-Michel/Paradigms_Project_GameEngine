import { engine } from "./Engine.js";
import { gen_grid } from "./SudokuGenerator.js";

export class Sudoku extends engine {
  constructor() {
    super();
    this.initialize(9, 9);
  }

  board_additions() {
    const board = document.querySelector("#board");
    board.style.width = "520px";
    board.style.textAlign = "center";
    board.style.margin = "auto";
    board.style.marginTop = "100px";
    board.style.color = "white";
  }
  cell_additions() {
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.width = "50px";
      cells[i].style.height = "50px";
      cells[i].style.float = "left";
      cells[i].style.backgroundColor = "gray";
      cells[i].style.margin = "2px";
      cells[i].style.fontSize = "30px";
      cells[i].style.fontFamily = "cursive";
    }
    let index = 5;
    while (index != -1) {
      for (let i = 0; i < 9; i++) {
        cells[9 * index + i].style.marginBottom = "5px";
      }
      index -= 3;
    }
    let count = 18;
    let bounce = 3;
    let indexx = -1;
    while (count--) {
      indexx += bounce;
      cells[indexx].style.marginRight = "5px";
      if (count % 2 == 0) {
        bounce = 6;
      } else {
        bounce = 3;
      }
    }
  }
  input_take() {
    const input1 = prompt("Enter the number: 1:9");
    let num = input1.charCodeAt(0) - 48;
    const input2 = prompt("Enter the place: 1a:9i");
    let row = input2.charCodeAt(0) - 49;
    let col = input2.charCodeAt(1) - 97;
    let input = { n: -1, r: -1, c: -1 };
    console.log(row, col, typeof num);
    input.n = num;
    input.r = row;
    input.c = col;
    return input;
  }

  drawer(grid, flag) {
    if (flag === true) {
      grid = gen_grid;
    }
    this.board_additions();
    this.cell_additions();
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      const row = cells[i].dataset.row;
      const col = cells[i].dataset.col;
      cells[i].textContent = grid[row][col];
    }
  }

  input_validation(grid, input, turn) {
    let row = input.r;
    let col = input.c;
    let num = input.n;
    let valid;
    if (row > 8 || col > 8 || num > 9 || row < 0 || col < 0 || num < 1) {
      valid = false;
      return valid;
    } else {
      if (grid[row][col] != " ") {
          grid[row][col] = " ";
          valid = true;
          return valid;
        
      } else {
        // check row
        for (let j = 0; j < 9; j++) {
          if (grid[row][j] === num && j !== col) {
            valid = false;
            return valid;
          }
        }

        // check column
        for (let i = 0; i < 9; i++) {
          if (grid[i][col] === num && i !== row) {
            valid = false;
            return valid;
          }
        }

        // check 3x3 box
        let boxRow = Math.floor(row / 3) * 3;
        let boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
          for (let j = boxCol; j < boxCol + 3; j++) {
            if (grid[i][j] === num && (i !== row || j !== col)) {
              valid = false;
              return valid;
            }
          }
        }
      }
    }
    grid[row][col] = num;
    valid = true;
    return valid;
  }

  controller(grid, input, turn) {
    let isEmpty = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] != " ") isEmpty = false;
        break;
      }
    }
    if (isEmpty) {
      grid = gen_grid;
    }
    let valid = this.input_validation(grid, input, turn);
    if (valid == true) {
      this.drawer(grid);
      return false;
    } else {
      alert("Invalid input");
    }
  }
}
