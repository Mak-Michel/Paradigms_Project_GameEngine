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

        // this.rowInput = document.createElement('input');
        // this.rowInput.type = 'number';
        // this.rowInput.id = 'row-input';
        // this.rowInput.name = 'row';
        // this.rowInput.min = 1;
        // this.rowInput.max = this.rows;
        // this.form.appendChild(this.rowInput);

        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.id = 'col-input';
        this.input.name = 'col';
        this.input.min = 1;
        this.input.max = this.cols;
        this.form.appendChild(this.input);

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
      var textElement = document.createElement('p');
      textElement.textContent = 'Enter the cell number:';
      this.form.insertBefore(textElement, this.input);
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
          this.row = this.input.value.charCodeAt(0) - 49;
          this.col = this.input.value.charCodeAt(1)- 97;
          this.controller();
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
    var textElement = document.createElement('p');
    textElement.textContent = 'Enter the column number:';
    this.form.insertBefore(textElement, this.input);
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
    this.col = null;
    this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.col = this.input.value.charCodeAt(0)- 97;
        console.log(this.col);
        this.controller();
      });
    document.body.appendChild(this.board);
    document.body.appendChild(this.form);
  }
  drawer(){
      const cells = document.querySelectorAll('.cell');
      for (let i = 0; i < cells.length; i++) {
        const row = cells[i].dataset.row;
        const col = cells[i].dataset.col;
        //cells[i].textContent = this.grid[row][col];
        if(this.grid[row][col] == '1'){
          cells[i].style.backgroundColor = 'red';
          console.log(this.turn);
        }else if( this.grid[row][col] == '2'){
          cells[i].style.backgroundColor = 'yellow';
          console.log(this.turn);
        }
      }
  }
  controller() {
    let flag = 0;
    if(this.col > 6 || this.col < 0){
      alert('Invalid place');
      return;
    }
    for(let i=5; i>= 0; i--){
      if(this.grid[i][this.col] != '1' && this.grid[i][this.col] != '2'){
        flag = 1;
        if(this.turn == 1){
          this.grid[i][this.col] = '1';
          this.turn = 2;
        }else{
          this.grid[i][this.col] = '2';
          this.turn = 1;
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

//chess
class Chess extends engine {
  constructor() {
    super(8, 8);        //inheritance
    this.board.style.gap = '50px';
    this.toInput = document.createElement('input');
    this.toInput.type = 'text';
    this.toInput.id = 'col-input';
    this.toInput.name = 'col1';
    this.toInput.min = 1;
    this.toInput.max = this.cols;
    this.form.appendChild(this.toInput);
    this.init();
    this.frow = null;
    this.fcol = null;
    this.trow = null;
    this.tcol = null;
    this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.frow = this.input.value.charCodeAt(0)- 49;
        this.fcol = this.input.value.charCodeAt(1)- 97;
        this.trow = this.toInput.value.charCodeAt(0)- 49;
        this.tcol = this.toInput.value.charCodeAt(1)- 97;
        this.controller();
      });
  
    document.body.appendChild(this.board);
    document.body.appendChild(this.form);
  }
  drawer() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
      const row = parseInt(cells[i].dataset.row);
      const col = parseInt(cells[i].dataset.col);
      if (this.grid[row][col] == ' ') {
        cells[i].textContent = this.grid[row][col];
      } else {
        cells[i].textContent = String.fromCharCode(this.grid[row][col]);
      }
    }
  }
  controller() {
    let clearPath = false;
    if (this.grid[this.frow][this.fcol] == ' ') {
      alert('Invalid place1');
    }else{
      if(this.turn == 1){ //white turn
        if(this.grid[this.trow][this.tcol] == 9813 || this.grid[this.trow][this.tcol] == 9814 ||
          this.grid[this.trow][this.tcol] == 9815 || this.grid[this.trow][this.tcol] == 9816 ||
          this.grid[this.trow][this.tcol] == 9816 || this.grid[this.trow][this.tcol] == 9817 || 
          this.grid[this.trow][this.tcol] == 9812){
           alert('Invalid move');
           return;
         }
        if(this.grid[this.frow][this.fcol] < 9812 || this.grid[this.frow][this.fcol] > 9817 ||
           this.trow < 0 || this.trow > 7 || this.tcol < 0 || this.tcol > 7){
            alert('Invalid place2');
            return;
        }else{
          var flag = 0;
          switch(this.grid[this.frow][this.fcol]){
              case 9817: //pawn
                if(this.trow == this.frow-1){
                  if(this.fcol == this.tcol){
                    if(this.grid[this.trow][this.tcol] == ' '){
                      flag = 1;
                    }else{
                      alert('Invalid place3');
                      return;
                    }
                  }else if((this.fcol - this.tcol) == 1 && this.grid[this.trow][this.tcol] != ' '){
                      flag = 1;
                  }else if((this.tcol - this.fcol) == 1 && this.grid[this.trow][this.tcol] != ' '){
                      flag = 1;
                  }
                }else if(this.trow == this.frow-2 && this.fcol == this.tcol){
                  if(this.grid[this.trow][this.tcol] == ' ' && this.grid[this.frow-1][this.fcol] == ' '){
                    if(this.frow == 6){
                      flag = 1;
                    }else{
                      alert('Invalid place3');
                      return;
                    }
                  }
                }else{
                  alert('invalid move');
                }
                if(flag == 1){
                  this.grid[this.trow][this.tcol] = 9817;
                  this.grid[this.frow][this.fcol] = ' ';
                }
                break;
              case 9812: //King
                if ((Math.abs(this.trow - this.frow) > 1) || (Math.abs(this.tcol - this.fcol) > 1) ||
                    (this.trow- this.frow == 0 && this.tcol- this.fcol == 0)) {
                  alert('Invalid move');
                  return;
                } else {
                  this.grid[this.trow][this.tcol] = 9812;
                  this.grid[this.frow][this.fcol] = ' ';
                }
                break;
              case 9813: //Queen
                if(this.trow - this.frow == 0 || this.tcol-this.fcol == 0){
                  clearPath = this.validateMove();
                }else if(Math.abs(this.trow - this.frow) === Math.abs(this.tcol - this.fcol)){
                  clearPath = this.validateMoveDiagonally();
                }
                if (clearPath) {
                  this.grid[this.trow][this.tcol] = 9813;
                  this.grid[this.frow][this.fcol] = ' ';
                } else {
                  alert('Invalid move');
                  return;
                }
              break;
              case 9814: //ٌRooks
                clearPath = this.validateMove();
                  if (clearPath) {
                    this.grid[this.trow][this.tcol] = 9814;
                    this.grid[this.frow][this.fcol] = ' ';
                  } else {
                    alert('Invalid move');
                    return;
                  }
              break;
              case 9815: //bishops
                clearPath = this.validateMoveDiagonally();
                if (clearPath) {
                  this.grid[this.trow][this.tcol] = 9815;
                  this.grid[this.frow][this.fcol] = ' ';
                } else {
                  alert('Invalid move');
                  return;
                }
              break;
              case 9816: //Knights
              if((Math.abs(this.tcol - this.fcol) == 1 && Math.abs(this.trow - this.frow) == 2) ||
                  (Math.abs(this.trow - this.frow) == 1 && Math.abs(this.tcol - this.fcol) == 2) ){
                    clearPath = true;
              }
                if (clearPath) {
                  this.grid[this.trow][this.tcol] = 9816;
                  this.grid[this.frow][this.fcol] = ' ';
                } else {
                  alert('Invalid move');
                  return;
                }
            }
          }
        }
        this.drawer();
        //this.turn = 2;
      }/*else{ //black turn

        this.turn = 1;
      }*/
    }

  init(){
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.style.width = '62px';
        cell.style.height = '62px';
        //black
        if(i == 1){
          cell.textContent = String.fromCharCode(9823);
          this.grid[i][j] = 9823;
        }
        if(i == 0 ){
          if(j == 0 || j ==7){ //Rooks
            cell.textContent = String.fromCharCode(9820);
            this.grid[i][j] = 9820;
          }
          if(j == 1 || j==6){  //Knights
            cell.textContent = String.fromCharCode(9822);
            this.grid[i][j] = 9822;
          }
          if(j == 2 || j==5){  //Bishops
            cell.textContent = String.fromCharCode(9821);
            this.grid[i][j] = 9821;
          }
          if(j == 3){  //Queen
            cell.textContent = String.fromCharCode(9819);
            this.grid[i][j] = 9819;
          }
          if(j == 4){  //King
            cell.textContent = String.fromCharCode(9818);
            this.grid[i][j] = 9818;
          }
        }
        //white
        if(i == 6){
          cell.textContent = String.fromCharCode(9817);
          this.grid[i][j] = 9817;
        }
        if(i == 7 ){
          if(j == 0 || j ==7){ //Rooks
            cell.textContent = String.fromCharCode(9814);
            this.grid[i][j] = 9814;
          }
          if(j == 1 || j==6){  //Knights
            cell.textContent = String.fromCharCode(9816);
            this.grid[i][j] = 9816;
          }
          if(j == 2 || j==5){  //Bishops
            cell.textContent = String.fromCharCode(9815);
            this.grid[i][j] = 9815;
          }
          if(j == 3){  //Queen
            cell.textContent = String.fromCharCode(9813);
            this.grid[i][j] = 9813;
          }
          if(j == 4){ //King
            cell.textContent = String.fromCharCode(9812);
            this.grid[i][j] = 9812;
          }  
        }
        if((i+j)%2 == 0){
          cell.style.backgroundColor = 'grey';
        }else{
          cell.style.backgroundColor = 'white';
        }
        this.board.appendChild(cell);
      }
    }
  }
  validateMove(){
    let clearPath = true;
    if(this.trow - this.frow === 0) {   //move horiznotal
      if(this.tcol > this.fcol){
        for(let j= this.fcol+1; j<this.tcol; j++){
          if (this.grid[this.trow][j] !== ' ') {
            clearPath = false;
            break;
          }
        }
      }else{
        for(let j= this.tcol+1; j<this.fcol; j++){
          if (this.grid[this.trow][j] !== ' ') {
            clearPath = false;
            break;
          }
        }
      }
    }else if(this.tcol - this.fcol === 0) { // move vertical
      let clearPath = true;
      if(this.trow > this.frow){  //move down
        for(let i= this.frow+1; i<this.trow; i++){
          if (this.grid[i][this.tcol] !== ' ') {
            clearPath = false;
            break;
          }
        }
      }else{  //move up
        for(let i= this.trow+1; i<this.frow; i++){
          if (this.grid[i][this.tcol] !== ' ') {
            clearPath = false;
            break;
          }
        }
      }
   }
   return clearPath;
  }
  validateMoveDiagonally(){
    let clearPath = true;
      if(this.trow > this.frow && this.tcol > this.fcol){  //move down right
        for(let i= this.frow+1, j = this.fcol+1; i<this.trow; i++, j++){
          if (this.grid[i][j] !== ' ') {
            clearPath = false;
            break;
          }
        }
      }else if(this.trow > this.frow && this.tcol < this.fcol){ //move down left
        for(let i= this.frow+1, j = this.fcol+1; i<this.trow; i++, j--){
          if (this.grid[i][j] !== ' ') {
            clearPath = false;
            break;
          }
        }
      }else if(this.trow < this.frow && this.tcol > this.fcol){ //move up right
        for(let i= this.frow+1, j = this.fcol+1; j<this.tcol; i--, j++){
          if (this.grid[i][j] !== ' ') {
            clearPath = false;
            break;
          }
        }
      }else{
        for(let i= this.trow+1, j = this.tcol+1; j<this.tcol; i--, j--){
          if (this.grid[i][j] !== ' ') {
            clearPath = false;
            break;
          }
        }
      }
      return clearPath;
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
        game = new Chess();
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