import { engine } from './Engine.js'

export class Connect4 extends engine {
    constructor() {
      super();
      this.initialize(6 , 7);
    }
  
    board_additions() {
      const board = document.querySelector("#board");
      board.style.backgroundColor = "blue";
      board.style.border = "10px solid navy";
      board.style.width = "580px";
      board.style.heigth = "540px";
      board.style.display = "flex";
      board.style.flexWrap = "wrap";
      board.style.margin = "auto";
      board.style.marginTop = "100px";
    }
    cell_additions() {
      const cells = document.querySelectorAll(".cell");
      for (let i = 0; i < cells.length; i++) {
        cells[i].style.width = "72px";
        cells[i].style.height = "72px";
        cells[i].style.margin = "5px";
        cells[i].style.backgroundColor = "white";
        cells[i].style.borderRadius = "50%";
      }
    }
    input_take() {    
        let input1 = prompt('Enter the input: a:g')
        let col = input1.charCodeAt(0) - 97;
        console.log(col);
        return col;
    }
   
    input_validation(col , grid , turn) {
      let valid = false;
      if(col > 6 || col < 0) {
        valid = false;
      }
      else {
        for (let i = 5; i >= 0; i--) {
          if (grid[i][col] != "1" && grid[i][col] != "2") {
            valid = true;
            if (turn == 1) {
              grid[i][col] = "1";
            } else {
              grid[i][col] = "2";
            }
            break;
          }
        }
      }
      return valid;
    }
    drawer(grid) {
    this.board_additions();
    this.cell_additions();
      const cells = document.querySelectorAll(".cell");
      for (let i = 0; i < cells.length; i++) {
        const row = cells[i].dataset.row;
        const col = cells[i].dataset.col;
        if (grid[row][col] == "1") {
          cells[i].style.backgroundColor = "red";
        } else if (grid[row][col] == "2") {      
          cells[i].style.backgroundColor = "yellow";
        }
      }
    }
   
    controller(grid , input , turn) {
      let valid = this.input_validation(input , grid , turn);
      if (valid === true) {
        this.drawer(grid);
        return true;
      } else {
        alert("Invalid place");
      }
    }
  }