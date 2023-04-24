class engine {
    constructor(rows , cols , turn) {
        this.rows = rows;
        this.cols = cols;
        this.grid = new Array(rows);
        for (let i = 0; i < rows; i++) {
            this.grid[i] = new Array(cols);
        }
        this.turn = 1;
    }
    drawer() {
        throw new Error('Engine call');
    }
    controller() {
        throw new Error('Engine call');
    }
}
// chess
class TTT extends engine {
    constructor() {
      super(3, 3, 1);
      this.currentPlayer = 1;
      this.grid = new Array(this.rows);
      for (let i = 0; i < this.rows; i++) {
        this.grid[i] = new Array(this.cols);
        for (let j = 0; j < this.cols; j++) {
          this.grid[i][j] = null;
        }
      }
  
      const container = document.createElement('div');
      container.classList.add('grid-container');
      console.log(container); // Log the container element
      container.style.gridTemplateColumns = `repeat(${this.cols}, 10px)`;
      container.style.gridTemplateRows = `repeat(${this.rows}, 10px)`;
  
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = i;
          cell.dataset.col = j;
          console.log(cell); // Log the cell element
  
        //   cell.addEventListener('click', () => {
        //     try {
        //       this.controller(i, j);
        //     } catch (error) {
        //       console.error(error.message);
        //     }
        //   });
  
          container.appendChild(cell);
        }
      }
  
      const form = document.createElement('form');
      const rowInput = document.createElement('input');
      rowInput.type = 'number';
      rowInput.id = 'row-input';
      rowInput.name = 'row';
      rowInput.min = 1;
      rowInput.max = this.rows;
      form.appendChild(rowInput);
  
      const colInput = document.createElement('input');
      colInput.type = 'number';
      colInput.id = 'col-input';
      colInput.name = 'col';
      colInput.min = 1;
      colInput.max = this.cols;
      form.appendChild(colInput);
  
      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.textContent = 'Play';
      form.appendChild(submitButton);
      this.row = null;
      this.col = null;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.row = parseInt(rowInput.value) - 1;
        this.col = parseInt(colInput.value) - 1;
        try {
          this.controller();
        } catch (error) {
          console.error(error.message);
        }
      });
  
      document.body.appendChild(container);
      document.body.appendChild(form);
    }
    drawer(){
        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cells.length; i++) {
          const row = cells[i].dataset.row;
          const col = cells[i].dataset.col;
          cells[i].textContent = this.grid[row][col];
        }
      };
    controller() {
      // validation note en row , col dol eli hana5odhom
      if (this.row > this.rows - 1 || this.row < 0 || this.col > this.cols - 1 || this.col < 0 || this.grid[this.row][this.col] != null)
        throw new Error('Invalid place');
      else {
        if (this.turn == 1) {
          this.grid[this.row][this.col] = 'X';
          this.turn = 2;
        } else if (this.turn == 2) {
          this.grid[this.row][this.col] = 'O';
          this.turn = 1;
        }
        this.drawer();
      }
    }
  }

let game;
const games = document.querySelectorAll('.game');

games.forEach(game => {
   game.addEventListener('click', () => {
      const text = game.textContent.trim();
      console.log(text);
      if(text === 'Tic-Tac-Toe'){
        document.querySelectorAll('.game').forEach(e => e.remove());
        game = new TTT();
        //game.drawer();
      }else if(text === 'Chess'){
        console.log(231);
      }else if(text === 'Checkers'){
        console.log(321);
      }else if(text === 'Connect4'){
        console.log(456);
      }else if(text === 'Sudoku'){
        console.log(546);
      }else if(text === '8-Queens'){
        console.log(654);
      }
   });
});

