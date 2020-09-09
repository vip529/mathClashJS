let dimension = 6;
let totalSum = 25;
let currentSum = 0;
let score = 0;

let board = [];

let targetElem = document.getElementById("total-sum");
let currentSumElem = document.getElementById("current-sum");
let gameBoardElem = document.getElementById("game-board");

const initTarget = () => {
  totalSum = 10 + Math.ceil(Math.random() * 50);
  currentSum = 0;
  targetElem.innerHTML = totalSum;
  currentSumElem.innerHTML = currentSum;
};

const updateScore = (score) => {
  let scoreElem = document.querySelector("#score");
  scoreElem.innerHTML = "SCORE : " + score;
};

const deselectAllSelected = () => {
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      board[i][j].selected = false;
    }
  }
};

const removeAllSelected = () => {
  let count = 0;
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      if (board[i][j].selected === true) {
        count++;
        board[i][j].value = "";
        board[i][j].selected = false;
      }
    }
  }
  return count;
};

const rearrangeBoard = () => {
  for (let c = 0; c < dimension; c++) {
    let col = "";
    for (let r = 0; r < dimension; r++) {
      col += board[r][c].value;
    }
    //console.log(col);
    let i = 0;
    for (i = 0; i < col.length; i++) {
      board[i][c].value = +col.charAt(i);
      //console.log(board[i][c]);
    }
    while (i < dimension) {
      board[i][c].value = "";
      i++;
    }
  }
  //updateBoard();
};

const handleClick = (cellElem, i, j) => {
  let currentCell = board[i][j];
  if (currentCell.value === "") {
    return;
  }
  currentCell.selected = !currentCell.selected;

  if (currentCell.selected === true) {
    currentSum += currentCell.value;
  } else if (currentCell.selected === false) {
    currentSum -= currentCell.value;
  }

  currentSumElem.innerHTML = "" + (totalSum - currentSum);

  if (currentSum > totalSum) {
    currentSum = 0;
    deselectAllSelected();
    currentSumElem.innerHTML = currentSum;
  } else if (currentSum === totalSum) {
    let noOfCellsRemoved = removeAllSelected();
    score += noOfCellsRemoved;
    initTarget();
    updateScore(score);
    rearrangeBoard();
  }

  updateBoard();
};

const getId = (i, j) => {
  return i + " " + j;
};

const addNewRow = () => {
  let newRow = [];
  for (let i = 0; i < dimension; i++) {
    let cellObj = {};
    cellObj.value = Math.ceil(Math.random() * 9);
    cellObj.selected = false;
    newRow.push(cellObj);
  }
  board.pop();
  board.unshift(newRow);
};

const updateBoard = () => {
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      let cellElem = document.getElementById(getId(i, j));
      cellElem.innerHTML = board[i][j].value;

      if (board[i][j].selected === true) {
        cellElem.classList.add("selected");
      } else if (cellElem.classList.contains("selected")) {
        cellElem.classList.remove("selected");
      }
    }
  }
};

const initGame = () => {
  /*<div class="board-row">
            <div class="cell center"></div>
            <div class="cell center"></div>
            <div class="cell center"></div>
            <div class="cell center"></div>
            <div class="cell center"></div>
            <div class="cell center"></div>
          </div>*/
  for (let i = 0; i < dimension; i++) {
    let rowArray = [];
    let rowElem = document.createElement("div");
    rowElem.classList.add("board-row");
    for (let j = 0; j < dimension; j++) {
      let cellObj = {};
      cellObj.value = "";
      cellObj.selected = false;
      rowArray.push(cellObj);
      let cellElem = document.createElement("div");
      cellElem.classList.add("cell");
      cellElem.classList.add("center");
      cellElem.setAttribute("id", getId(i, j));
      cellElem.addEventListener("click", () => handleClick(cellElem, i, j));
      rowElem.appendChild(cellElem);
    }
    board.push(rowArray);
    gameBoardElem.appendChild(rowElem);
  }
};

const gameOver = () => {
  for (let j = 0; j < dimension; j++) {
    if (board[5][j].value !== "") {
      return true;
    }
  }
  return false;
};

const startTimer = () => {
  let startGameIntervalId = setInterval(function () {
    if (gameOver()) {
      clearInterval(startGameIntervalId);
      alert("Game is Over!!");
      return;
    }
    addNewRow();
    updateBoard();
  }, 3000);
};

initGame();
initTarget();
startTimer();

