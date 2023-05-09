export class engine {
  constructor() {
    // this.rows = rows;
    // this.cols = cols;
    // this.grid = this.initialize_grid(this.rows, this.cols); // data in array
    // this.board = this.create_board(this.rows, this.cols);
    // this.turn = 1;
    // this.stack = [];
  }
  async initialize(rows , cols){
    let grid = this.initialize_grid(rows , cols);
    this.create_board(rows , cols);
    let turn = 1;
    let swap = false;
    let flag = true;
    this.drawer(grid , flag);
    await this.sleep(1000);
    const loop = async () => {
            if(swap == true){
              turn = this.swap_turn(turn);
            }
            swap = this.controller(grid , this.input_take() , turn);
            await this.sleep(1000);
            loop(); // Call the function again to repeat the loop
    };
    loop(); // Call the function to start the loop
    
    // let stack = [];
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  initialize_grid(rows, cols) {
    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
      for (let j = 0; j < rows; j++) {
        grid[i][j] = " ";
      }
    }
    return grid;
  }
  /////////////////////////////////////////////////////
  cell_additions() {
    throw new Error("Engine call");
  }
  /////////////////////////////////////////////////////
  create_board(rows, cols) {
    const board = document.createElement("div");
    board.id = "board";
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;
        board.appendChild(cell);
      }
    }
    document.body.appendChild(board);
    return board;
  }
  /////////////////////////////////////////////////////

  //di bn7ot fiha kol 7aga ziada fi board
  board_additions() {
    throw new Error("Engine call");
  }
  // na5od input hna b2a
  input_take() {
    throw new Error("Engine call");
  }
  input_validation(grid , input , turn) {
    throw new Error("Engine call");
  }
  ///////////////////////////////////////////////////
  swap_turn(turn) {
    if (turn === 1) {
      turn = 2;
    } else if (turn === 2) {
      turn = 1;
    }
    return turn;
  }
  drawer(grid) {
    throw new Error("Engine call");
  }
  controller(grid , input , turn) {
    throw new Error("Engine call");
  }
}
