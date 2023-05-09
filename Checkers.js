//Checkers
import { engine } from "./Engine.js";

export class Checkers extends engine {
  constructor() {
    super();
    this.initialize(10, 10);
  }

  controller(grid, input, turn) {
    let valid = this.input_validation(grid, input, turn);
    if (valid === true) {
      this.drawer(grid);
      return true;
    } else {
      alert("Invalid place");
    }
  }

  validateMoveDiagonally(grid, row_i, col_i, row_f, col_f) {
    let count = 0;
    let place = [];
    if (row_f > row_i && col_f > col_i) {
      //move down right
      for (let i = row_i + 1, j = col_i + 1; i < row_f; i++, j++) {
        if (grid[i][j] !== " ") {
          count++;
          place[0] = i;
          place[1] = j;
        }
      }
    } else if (row_f > row_i && col_f < col_i) {
      //move down left
      for (let i = row_i + 1, j = col_i - 1; i < row_f; i++, j--) {
        if (grid[i][j] !== " ") {
          count++;
          place[0] = i;
          place[1] = j;
        }
      }
    } else if (row_f < row_i && col_f > col_i) {
      //move up right
      for (let i = row_i - 1, j = col_i + 1; j < col_f; i--, j++) {
        if (grid[i][j] !== " ") {
          count++;
          place[0] = i;
          place[1] = j;
        }
      }
    } else {
      for (let i = row_f + 1, j = col_f + 1; j < col_i; i++, j++) {
        //move up left
        if (grid[i][j] !== " ") {
          count++;
          place[0] = i;
          place[1] = j;
        }
      }
    }
    c_and_p = { c: count, p: place };
    return c_and_p;
  }
  input_validation(grid, input, turn) {
    let row_i = input.r_i;
    let col_i = input.c_i;
    let row_f = input.r_f;
    let col_f = input.c_f;
    let valid;
    let piece;
    if (grid[row_i][col_i] == " ") {
      valid = false;
      return valid;
    } else if (grid[row_f][col_f] != " ") {
      valid = false;
      return valid;
    } else if (
      grid[row_i][col_i] < 1 ||
      grid[row_i][col_i] > 4 ||
      row_f < 1 ||
      row_f > 8 ||
      col_f < 1 ||
      col_f > 8
    ) {
      valid = false;
      return valid;
    } else {
      if (turn == 1) {
        //white turn
        if (grid[row_i][col_i] == 1) {
          if (
            row_f == row_i - 1 &&
            (col_f == col_i + 1 || col_f == col_i - 1)
          ) {
            piece = 1;
          } else if (row_f == row_i - 2 && col_f == col_i + 2) {
            if (
              grid[row_i - 1][col_i + 1] == 2 ||
              grid[row_i - 1][col_i + 1] == 4
            ) {
              piece = 1;
              grid[row_i - 1][col_i + 1] = " ";
            }
          } else if (row_f == row_i - 2 && col_f == col_i - 2) {
            if (
              grid[row_i - 1][col_i - 1] == 2 ||
              grid[row_i - 1][col_i - 1] == 4
            ) {
              piece = 1;
              grid[row_i - 1][col_i - 1] = " ";
            }
          } else if (row_f == row_i + 2 && col_f == col_i + 2) {
            if (
              grid[row_i + 1][col_i + 1] == 2 ||
              grid[row_i + 1][col_i + 1] == 4
            ) {
              piece = 1;
              grid[row_i + 1][col_i + 1] = " ";
            }
          } else if (row_f == row_i + 2 && col_f == col_i - 2) {
            if (
              grid[row_i + 1][col_i - 1] == 2 ||
              grid[row_i + 1][col_i - 1] == 4
            ) {
              piece = 1;
              grid[row_i + 1][col_i - 1] = " ";
            }
          }
        } else if (grid[row_i][col_i] == 3) {
          let c_and_p = this.validateMoveDiagonally(
            grid,
            row_i,
            col_i,
            row_f,
            col_f
          );
          let count = c_and_p.c;
          let piece2 = c_and_p.p;
          if (count == 0) {
            piece = 3;
          } else if (count == 1) {
            grid[piece2[0]][piece2[1]] = " ";
            piece = 3;
          } else {
            valid = false; // kda tmm
            return valid;
          }
        }
        valid = true;
        grid[row_f][col_f] = piece;
        grid[row_i][col_i] = " ";
        if (row_f == 1) {
          grid[row_f][col_f] = 3;
        }
        return valid;
      } else {
        // black turn
        if (grid[row_i][col_i] == 2) {
          if (
            row_f == row_i + 1 &&
            (col_f == col_i + 1 || col_f == col_i - 1)
          ) {
            piece = 2;
          } else if (row_f == row_i - 2 && col_f == col_i + 2) {
            if (
              grid[row_i - 1][col_i + 1] == 1 ||
              grid[row_i - 1][col_i + 1] == 3
            ) {
              piece = 2;
              grid[row_i - 1][col_i + 1] = " ";
            }
          } else if (row_f == row_i - 2 && col_f == col_i - 2) {
            if (
              grid[row_i - 1][col_i - 1] == 1 ||
              grid[row_i - 1][col_i - 1] == 3
            ) {
              piece = 2;
              grid[row_i - 1][col_i - 1] = " ";
            }
          } else if (row_f == row_i + 2 && col_f == col_i + 2) {
            if (
              grid[row_i + 1][col_i + 1] == 1 ||
              grid[row_i + 1][col_i + 1] == 3
            ) {
              piece = 2;
              grid[row_i + 1][col_i + 1] = " ";
            }
          } else if (row_f == row_i + 2 && col_f == col_i - 2) {
            if (
              grid[row_i + 1][col_i - 1] == 1 ||
              grid[row_i + 1][col_i - 1] == 3
            ) {
              piece = 2;
              grid[row_i + 1][col_i - 1] = " ";
            }
          }
        } else if (grid[row_i][col_i] == 4) {
          let c_and_p = this.validateMoveDiagonally(
            grid,
            row_i,
            col_i,
            row_f,
            col_f
          );
          let count = c_and_p.c;
          let piece2 = c_and_p.p;
          if (count == 0) {
            piece = 4;
          } else if (count == 1) {
            grid[piece2[0]][piece2[1]] = " ";
            piece = 4;
          } else {
            valid = false; // kda tmm
            return valid;
          }
        }
        valid = true;
        grid[row_f][col_f] = piece;
        grid[row_i][col_i] = " ";
        if (row_f == 8) {
          grid[row_f][col_f] = 4;
        }
        return valid;
      }
    }
  }

  board_additions() {
    const board = document.querySelector("#board");
    board.style.width = "620px";
    board.style.textAlign = "center";
    board.style.margin = "auto";
    board.style.marginTop = "100px";
  }
  cell_additions(grid) {
    var rowNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    var colLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const white1 = "white1.png";
    const black1 = "black1.png";
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
            grid[i][j] = colLetters[j - 1];
          }
          cells[index].style.backgroundColor = "brown";
          cells[index].style.border = "0px";
        } else {
          if (j == 0 || j == 9) {
            if (i > 0) {
              cells[index].textContent = rowNumbers[i - 1];
              grid[i][j] = rowNumbers[j - 1];
            }
            cells[index].style.backgroundColor = "brown";
            cells[index].style.border = "0px";
          } else {
            //black
            if ((i == 1 || i == 3) && j % 2 == 0) {
              cells[
                index
              ].innerHTML = `<img src="${black1}" alt="My Image" style="width: 100%; height: 100%;">`;
              grid[i][j] = 2;
            }
            if (i == 2 && j % 2 == 1) {
              cells[
                index
              ].innerHTML = `<img src="${black1}" alt="My Image" style="width: 100%; height: 100%;">`;
              grid[i][j] = 2;
            }
            //white
            if (i == 7 && j % 2 == 0) {
              cells[
                index
              ].innerHTML = `<img src="${white1}" alt="My Image" style="width: 100%; height: 100%;">`;
              grid[i][j] = 1;
            }
            if ((i == 6 || i == 8) && j % 2 == 1) {
              cells[
                index
              ].innerHTML = `<img src="${white1}" alt="My Image" style="width: 100%; height: 100%;">`;
              grid[i][j] = 1;
            }
            if ((i + j) % 2 == 1) {
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
    let input1 = prompt("Enter the initail position: 7a");
    let row_i = input1.charCodeAt(0) - 48;
    let col_i = input1.charCodeAt(1) - 96;
    let input2 = prompt("Enter the final position: 6a");
    let row_f = input2.charCodeAt(0) - 48;
    let col_f = input2.charCodeAt(1) - 96;
    let input = { r_i: -1, c_i: -1, r_f: -1, c_f: -1 };
    input.r_i = row_i;
    input.c_i = col_i;
    input.r_f = row_f;
    input.c_f = col_f;
    return input;
  }
  drawer(grid , flag) {
    this.board_additions();
    if (flag === true) {
      this.cell_additions(grid);
    }
    const white1 = "white1.png";
    const black1 = "black1.png";
    const white2 = "white2.png";
    const black2 = "black2.png";
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      const row = parseInt(cells[i].dataset.row);
      const col = parseInt(cells[i].dataset.col);
      if (grid[row][col] == " ") {
        cells[i].innerHTML = " ";
      } else if (grid[row][col] == 1) {
        // white piece
        cells[i].innerHTML = `<img src="${white1}" alt="My Image" style="width: 100%; height: 100%;">`;
      } else if (grid[row][col] == 2) {
        // black piece
        cells[i].innerHTML = `<img src="${black1}" alt="My Image" style="width: 100%; height: 100%;">`;
      } else if (grid[row][col] == 3) {
        // king white
        cells[i].innerHTML = `<img src="${white2}" alt="My Image" style="width: 100%; height: 100%;">`;
      } else if (grid[row][col] == 4) {
        // king black
        cells[i].innerHTML = `<img src="${black2}" alt="My Image" style="width: 100%; height: 100%;">`;
      }
    }
  }
}
