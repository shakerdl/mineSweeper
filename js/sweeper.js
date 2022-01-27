"use strict";
const FLAG = "🎏";
var gLevel = { SIZE: 4, MINES: 2 };
var FLAGS_COUNT = 0;
var MINES = [];
var DEFAULT_IS_SHOWN = false;
var gInterval;
// This is an object by which the board size is set
//  (in this case: 4x4 board and how many mines to put)
// var gNextNumber = 1;
// var gInterval = null;
// var gGame.secsPassed = 0;
var gNgsCount;

var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
// This is an object in which you can keep and update the current game state:
// isOn: Boolean, when true we let the user play shownCount: How many cells are shown markedCount: How many cells are marked (with a flag)
// secsPassed: How many seconds passed
var gBoard;

function initGame() {
  gBoard = buildBoard();
  for (let index = 0; index < gLevel.MINES; index++) {
    randomMine(gBoard);
  }
  console.table(gBoard);
  renderBoard(gBoard, ".board");
}

function chosenLevel(num) {
  switch (num) {
    case 1:
      gLevel.SIZE = 4;
      gLevel.MINES = 2;
      break;
    case 2:
      gLevel.SIZE = 8;
      gLevel.MINES = 12;
      break;
    case 3:
      gLevel.SIZE = 12;
      gLevel.MINES = 30;
      break;
    default:
      break;
  }
  initGame();
}
function checkIfWin(){
  var markCount = 0;
  for (let index = 0; index < MINES.length; index++) {
    const mine = MINES[index];
    if(mine.isMarked){
      markCount++;
    }
  }
  if(MINES.length === markCount && markCount === FLAGS_COUNT){
    revealAll();
    gameOver();
    alert("Good game! ✨🎉✨✨")
  }
}
function cellMarked(elCell, i, j, ev) {
  // ill return
  if (ev.button === 2) {
    if (!gBoard[i][j].isMarked) {
      gBoard[i][j].isMarked = true;
      elCell.innerHTML = FLAG;
      FLAGS_COUNT ++;
    } else {
      gBoard[i][j].isMarked = false;
      FLAGS_COUNT--;
      elCell.innerHTML = "";
    }
  }
  checkIfWin();
}
function toggelFlag() {
  // var mark = false
  // if()
}

function buildBoard() {
  var SIZE = gLevel.SIZE;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      var cell = {
        id:`${i}${j}`,
        i,j,
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
      board[i][j] = cell;

      // if (
      //   (i === 1 && j === 1) ||
      //   (i === 1 && j === 8) ||
      //   (i === 8 && j === 1) ||
      //   (i === 8 && j === 8)
      // ) {
      //   board[i][j] = SUPER_FOOD;
      //   gFoodCounter -= 4;
      // }
    }
  }

  return board;
}

function renderBoard(mat, selector) {
  var strHTML = "";
  for (var i = 0; i < mat.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < mat[0].length; j++) {
      var currCell = mat[i][j];
      var minesCount = setMinesNegsCount(mat, i, j);
      currCell.minesAroundCount = minesCount;
      var isMine = currCell.isMine;
      strHTML += `<td id="${i}${j}" oncontextmenu="return false;" onmousedown="cellMarked(this,${i},${j},event)"
                data-i="${i}" data-j="${j}"
                onclick="cellClicked(this,${i},${j})">${
        DEFAULT_IS_SHOWN ? (isMine ? "🧨" : minesCount) : ""
      }</td>`;
    }
    strHTML += "</tr>";
  }
  var elBoard = document.querySelector(selector);
  elBoard.innerHTML = strHTML;
}
function revealAll(){
  for (let boardIndex = 0; boardIndex < gBoard.length; boardIndex++) {
    const cells = gBoard[boardIndex];
    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      const cell = cells[cellIndex];
      var element = document.getElementById(cell.id);
      if(cell.isMine){
        element.innerHTML = FLAG;
      }else{
        element.innerHTML = cell.minesAroundCount
      }
    }
  }
  console.log(gBoard);
}
function RevealAllMines() {
MINES.forEach(mine=>{
  var el = document.getElementById(mine.id);
  if(!el){
    throw new Error("not good");
  }
  revealBombByElement(el);
})

}
function randomMine(board) {
  // improve it later

  var randMineI = getRandomInt(0, board.length);
  var randMinej = getRandomInt(0, board.length);
  if (board[randMineI][randMinej].isMine) {
    randomMine(board);
  } else board[randMineI][randMinej].isMine = true;
  MINES.push(board[randMineI][randMinej]);
}

function setMinesNegsCount(board, cellI, cellJ) {
  var countTest = 0;
  // Count mines around each
  //  cell and set the cell's
  //  minesAroundCount.
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= board[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      var cell = board[i][j];
      if (cell.isMine === true) {
        countTest++;
      }
    }
  }
  return countTest;
}

function cellClicked(elCell, i, j) {
  if(gBoard[i][j].isMarked) return
  if (!gGame.isOn) {
    gGame.isOn = true;
    timer();
  }
  renderMinesEndGame(elCell, i, j);
  
}

// function renderMinesEndGame(element, i, j) {
//   const cell = gBoard[i][j];
//   const isMine = cell.isMine;
//   const count = cell.minesAroundCount;
//   if (isMine) {
//     element.innerHTML = "BOOMB 🧨";

//     gameOver();
//   } else {
//     element.innerHTML = count;
//   }
// }
function getCountOfCell(i,j) {
  const cell = gBoard[i][j];
  const count = cell.minesAroundCount;
  return count;
}
function checkIfMine(i,j) {
  const cell = gBoard[i][j];
  const isMine = cell.isMine;
  return isMine;
}
function revealBombByElement(element){
  element.innerHTML = "BOOMB 🧨";
}

function renderMinesEndGame(element, i, j) {
  const isMine = checkIfMine(i,j);
  const count = getCountOfCell(i,j);
  if (isMine) {
    revealBombByElement(element);
    RevealAllMines();
    gameOver();
  } else {
    element.innerHTML = count;
  }
}

function timer() {
  gInterval = setInterval(countTime, 1000);
}

function countTime() {
  var display = " ";
  gGame.secsPassed++;
  if (gGame.secsPassed > 60) {
    const seconds =
      gGame.secsPassed % 60 < 10
        ? "0" + (gGame.secsPassed % 60)
        : gGame.secsPassed % 60;
    display = parseInt(gGame.secsPassed / 60) + " : " + seconds;
  } else display = gGame.secsPassed;
  var elTimer = document.querySelector(".timer");
  elTimer.innerHTML = `Game time : ${display}`;
}

function gameOver() {
  // RevealAllMines();
  // revealAll()
  MINES = [];
  FLAGS_COUNT = 0;
  clearInterval(gInterval);
  gGame.secsPassed = 0;
  gGame.isOn = false;
  var elTimer = document.querySelector(".timer");
  elTimer.innerHTML = `Game time :`;
}
// function checkGameOver() {
//     // Game ends when all mines are
//     // marked, and all the other cells are shown
//     var elDiv = document.querySelector('.modal');
//     var elDivSpan = elDiv.querySelector('span');
//     elDivSpan.innerText = (gGame.score === gFoodCounter) ? 'VICTORY' : 'GAME OVER !'
//     elDiv.style.display = 'block';
//     gGame.score = 0;
//     gGame.isOn = false;
//     clearInterval(gIntervalGhosts);
//     clearInterval(gIntervalCherry);
//     // update the model
//     gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
//     // update the DOM
//     renderCell(gPacman.location, EMPTY)
// }
// function expandShown(board, elCell, i, j) {
// //     When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
// // NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
// // BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)

// }
// function numsArray(count) {
//   var arraySize = count ** 2;
//   var array = [];
//   for (var i = 1; i <= arraySize; i++) {
//     array.push(i);
//   }
//   return shuffle(array);
// }

// function shuffle(items) {
//   var randIdx, keep, i;
//   for (i = items.length - 1; i > 0; i--) {
//     randIdx = getRandomInt(0, items.length - 1);

//     keep = items[i];
//     items[i] = items[randIdx];
//     items[randIdx] = keep;
//   }
//   return items;
// }

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
