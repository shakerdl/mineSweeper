"use strict";
var gLevel = { SIZE: 4, MINES: 2 };
// This is an object by which the board size is set
//  (in this case: 4x4 board and how many mines to put)
// var gNextNumber = 1;
// var gInterval = null;
// var gTimePassedInSeconds = 0;
const MINE = 'mine'
var gNgsCount;
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
// This is an object in which you can keep and update the current game state:
// isOn: Boolean, when true we let the user play shownCount: How many cells are shown markedCount: How many cells are marked (with a flag)
// secsPassed: How many seconds passed
var gBoard;

function initGame() {
  gBoard = buildBoard();
  console.table(gBoard);
  renderBoard(gBoard, ".board");
}

function buildBoard() {
  //  Builds the board
  // Set mines at random locations
  // Call setMinesNegsCount()
  // Return the created board

  var SIZE = gLevel.SIZE;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: true,
      };
      board[i][j] = cell;
      if ((i === 1 && j === 2) || (i === 2 && j === 3)) {
        cell.isMine = true;
        board[i][j] = MINE
      }
      
      if (cell.isMine) cell.isShown = true;
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

function setMinesNegsCount(board, cellI, cellJ) {
  // Count mines around each
  //  cell and set the cell's
  //  minesAroundCount.
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= board[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      var cell = board[i][j];
      gNgsCount++;
      if (cell.isMine === true) {
        cell.
        cell.minesAroundCount++;
        // Update the Model:
        // board[i][j] = ''
        // Update the Dom:
        // var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
        // elCell.innerText = ''
        // elCell.classList.remove('occupied')
      }
    }
  }
}

console.log(gGame.shownCount);

function cellClicked(elCell, i, j) {
  // setMinesNegsCount(gBoard,i, j);

  //Implement that clicking a cell with “number” reveals the number of this cell
  if (elCell.innerText === Number) {
    // revele all content
    gBoard[i][j].isShown = tu;
  }

  // var elNextNum = document.querySelector(".next");
  // if (num === 1) timer();
  // if (num === gSize ** 2 && gNextNumber === num) {
  //   var restart = confirm("Victory!");
  //   clearInterval(gInterval);
  //   if (restart) resetGame();
  // }
  // if (num === gNextNumber) {
  //   elCell.classList.add("clicked");
  //   gNextNumber++;
  //   elNextNum.innerHTML = `Next number :${gNextNumber}`;
  // }
  // console.log("gNextNumber", gNextNumber);
}

// function cellMarked(elCell) {
// //     Called on right click to mark a cell
// //     (suspected to be a mine)
// //    Search the web (and implement) how to hide the context menu on right click

// }

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

// function timer() {
//   gInterval = setInterval(countTime, 1000);
// }

// function countTime() {
//   var display = " ";
//   gTimePassedInSeconds++;
//   if (gTimePassedInSeconds > 60) {
//     const seconds =
//       gTimePassedInSeconds % 60 < 10
//         ? "0" + (gTimePassedInSeconds % 60)
//         : gTimePassedInSeconds % 60;
//     display = parseInt(gTimePassedInSeconds / 60) + " : " + seconds;
//   } else display = gTimePassedInSeconds;
//   var elTimer = document.querySelector(".timer");
//   elTimer.innerHTML = `Game time : ${display}`;
// }

// function resetGame() {
//   gSize = 4;
//   gNextNumber = 1;
//   gInterval = null;
//   gTimePassedInSeconds = 0;
//   renderBoard(4);
//   var elTimer = document.querySelector(".timer");
//   elTimer.innerHTML = `Game time :`;
//   var elNextNum = document.querySelector(".next");
//   elNextNum.innerHTML = `Next number :`;
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
