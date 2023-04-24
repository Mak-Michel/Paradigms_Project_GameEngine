class engine {
    constructor(rows , cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = new Array(rows);
        for (let i = 0; i < rows; i++) {
            this.grid[i] = new Array(cols);
            for (let j = 0; j < rows; j++) {
              this.grid[i][j] = ' ';
          }
        }
        this.turn = 1;

        this.board = document.createElement('div');
        this.board.classList.add('board');
        this.board.style.gridTemplateColumns = `repeat(${this.cols}, 10px)`;
        this.board.style.gridTemplateRows = `repeat(${this.rows}, 10px)`;
        
        this.form = document.createElement('form');

        this.rowInput = document.createElement('input');
        this.rowInput.type = 'number';
        this.rowInput.id = 'row-input';
        this.rowInput.name = 'row';
        this.rowInput.min = 1;
        this.rowInput.max = this.rows;
        this.form.appendChild(this.rowInput);

        this.colInput = document.createElement('input');
        this.colInput.type = 'text';
        this.colInput.id = 'col-input';
        this.colInput.name = 'col';
        this.colInput.min = 1;
        this.colInput.max = this.cols;
        this.form.appendChild(this.colInput);

        this.submitButton = document.createElement('button');
        this.submitButton.type = 'submit';
        this.submitButton.textContent = 'Play';
        this.form.appendChild(this.submitButton);
    }
    drawer() {
        throw new Error('Engine call');
    }
    controller() {
        throw new Error('Engine call');
    }
}
// TTT
class TTT extends engine {
    constructor() {
      super(3, 3);        //inheritance
      this.board.style.gap = '100px';
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = i;
          cell.dataset.col = j;
          this.board.appendChild(cell);
        }
      }

      this.row = null;
      this.col = null;
      this.form.addEventListener('submit', (event) => {
          event.preventDefault();
          this.row = parseInt(this.rowInput.value) - 1;
          this.col = this.colInput.value.charCodeAt(0)- 97;
          try {
            this.controller();
          } catch (error) {
            console.error(error.message);
          }
        });
    
      document.body.appendChild(this.board);
      document.body.appendChild(this.form);
    }
    drawer(){
        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cells.length; i++) {
          const row = cells[i].dataset.row;
          const col = cells[i].dataset.col;
          cells[i].textContent = this.grid[row][col];
        }
    }
    controller() {
      if (this.grid[this.row][this.col] != ' ') {
        alert('Invalid place');
        this.drawer();
      }
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

class Connect4 extends engine {
  constructor() {
    super(6, 7);
    this.board.style.backgroundColor = 'blue';
    this.board.style.border = '10px solid navy';
    this.board.style.width = '610px';
    this.board.style.heigth = '540px';
    this.board.style.display = 'flex';
    this.board.style.flexWrap = 'wrap';
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.style.width = '72px';
        cell.style.height = '72px';
        cell.style.margin = '5px';
        cell.style.backgroundColor = 'white';
        cell.style.borderRadius = '50%';
        console.log(cell);
        this.board.appendChild(cell);
      }
    }
    this.rowInput.style.visibility = 'hidden';
 
    this.col = null;
    this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.col = this.colInput.value.charCodeAt(0)- 97;
        try {
          this.controller();
        } catch (error) {
          console.error(error.message);
        }
      });
  
    document.body.appendChild(this.board);
    document.body.appendChild(this.form);
  }
  drawer(){
      const cells = document.querySelectorAll('.cell');
      for (let i = 0; i < cells.length; i++) {
        const row = cells[i].dataset.row;
        const col = cells[i].dataset.col;
        cells[i].textContent = this.grid[row][col];
        if(this.grid[row][col] == '1'){
          cells[i].style.backgroundColor = 'red';
          console.log(this.turn);
        }else if( this.grid[row][col] == '2'){
          cells[i].style.backgroundColor = 'yellow';
          console.log(this.turn);
        }
      }
      for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
          console.log(this.grid[i][j]);
        }
      }
      this.turn = this.turn%2;
      this.turn++;
      
  }
  controller() {
    let flag = 0;
    for(let i=5; i>= 0; i--){
      if(this.grid[i][this.col] != '1' && this.grid[i][this.col] != '2'){
        flag = 1;
        if(this.turn == 1){
          this.grid[i][this.col] = '1';
        }else{
          this.grid[i][this.col] = '2';
        }
        break;
      }
    }
    
    if(flag === 1){
      this.drawer();
    }else{
      alert('Invalid place');
    }
  }
}
//////////////////////////////////////////////////////////////////
let game;
const games = document.querySelectorAll('.game');

games.forEach(game => {
   game.addEventListener('click', () => {
      const text = game.textContent.trim();
      console.log(text);
      if(text === 'Tic-Tac-Toe'){
        game = new TTT();
      }else if(text === 'Chess'){
        console.log(231);
      }else if(text === 'Checkers'){
        console.log(321);
      }else if(text === 'Connect4'){
        game = new Connect4();
      }else if(text === 'Sudoku'){
        console.log(546);
      }else if(text === '8-Queens'){
        console.log(654);
      }
      document.querySelectorAll('.game').forEach(e => e.remove());
      var title = document.querySelector(".title");
      title.textContent = text;
   });
});

//   cell.addEventListener('click', () => {
        //     try {
        //       this.controller(i, j);
        //     } catch (error) {
        //       console.error(error.message);
        //     }
        //   });