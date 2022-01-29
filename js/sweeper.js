"use strict";
const FLAG = "🎏";
var gLevel = { SIZE: 4, MINES: 2 };
var FLAGS_COUNT = 0;
var MINES = [];
var DEFAULT_IS_SHOWN = false;
var gInterval = null;
var gLives = [1,2,3];
// This is an object by which the board size is set
//  (in this case: 4x4 board and how many mines to put)
// var gNextNumber = 1;
// var gInterval = null;
// var gGame.secsPassed = 0;

var gGame = {
  isOn: true,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  firstClick: true,
};
// This is an object in which you can keep and update the current game state:
// isOn: Boolean, when true we let the user play shownCount: How many cells are shown markedCount: How many cells are marked (with a flag)
// secsPassed: How many seconds passed
var gBoard;

function initGame() {
  gLives = 3;
  MINES = [];
  gGame.firstClick = true;
  FLAGS_COUNT = 0;
  clearInterval(gInterval);
  gGame.secsPassed = 0;
  // var elTimer = document.querySelector(".timer");
  // elTimer.innerHTML = `Game time :`;
  gGame.isOn = true;
  gBoard = buildBoard();
  for (let index = 0; index < gLevel.MINES; index++) {
    randomMine(gBoard);
  }
  renderLives()
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

function cellMarked(elCell, i, j, ev) {
  // ill returnz
  if (ev.button === 2) {
    if (!gBoard[i][j].isMarked) {
      gBoard[i][j].isMarked = true;
      elCell.innerHTML = FLAG;
      FLAGS_COUNT++;
    } else {
      gBoard[i][j].isMarked = false;
      FLAGS_COUNT--;
      elCell.innerHTML = "";
    }
  }
  checkIfWin();
}

function buildBoard() {
  var SIZE = gLevel.SIZE;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      var cell = {
        id: `${i}${j}`,
        i,
        j,
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
      var countMine = 0;
      setMinesNegsCount(mat, i, j, (cell) => {
        if (cell.isMine === true) {
          countMine++;
        }
      });
      currCell.minesAroundCount = countMine;
      // currCell.minesAroundCount = minesCount;
      var isMine = currCell.isMine;
      strHTML += `<td class="cell-${i}-${j}" id="${i}${j}" oncontextmenu="return false;" onmousedown="cellMarked(this,${i},${j},event)"
                data-i="${i}" data-j="${j}"
                onclick="cellClicked(this,${i},${j})">${
        DEFAULT_IS_SHOWN
          ? isMine
            ? "🧨"
            : countMine
          : `<img class="block" src="../img/mineBlock.png"/>`
      }</td>`;
    }
    strHTML += "</tr>";
  }
  var elBoard = document.querySelector(selector);
  elBoard.innerHTML = strHTML;
}
function revealAll() {
  for (let i = 0; i < gBoard.length; i++) {
    const cells = gBoard[i];
    for (let j = 0; j < cells.length; j++) {
      const cell = cells[i][j];
      var element = document.getElementById(cell.id);
      if (cell.isMine) {
        element.innerHTML = FLAG;
      } else {
        element.innerHTML = cell.minesAroundCount;
      }
    }
  }
  // for (let boardIndex = 0; boardIndex < gBoard.length; boardIndex++) {
  //   const cells = gBoard[boardIndex];
  //   for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
  //     const cell = cells[cellIndex];
  //     var element = document.getElementById(cell.id);
  //     if(cell.isMine){
  //       element.innerHTML = FLAG;
  //     }else{
  //       element.innerHTML = cell.minesAroundCount
  //     }
  //   }
  // }
  console.log(gBoard);
}

function setMinesNegsCount(board, cellI, cellJ, onWalk) {
  // here
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= board[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      var cell = board[i][j];
      onWalk(cell);
    }
  }
}

function cellClicked(elCell, i, j) {
  if (gGame.isOn) {
    if (gGame.firstClick) {
      timer();
      if (checkIfMine(i, j)) return initGame();
    }
    gGame.firstClick = false;
    renderMine(elCell, i, j);

    if (gBoard[i][j].minesAroundCount === 0) {
      checkZeros(i, j);
    }
    Array.from(document.querySelectorAll("[data-dirty]")).forEach((el) =>
      el.removeAttribute("data-dirty")
    );
  }
}

// smalls functions
function renderExpand(cell) {
  if (cell.minesAroundCount === 0) {
    // reveal
    var el = document.getElementById(cell.id);
    if (!el) {
      throw new Error("no good");
    }
    // var imgStone = document.createElement('img')
    // imgStone.src = '../img/Stone.png'
    // imgStone.classList.add('stone')
    // el.appendChild(imgStone)
    el.style.backgroundColor = "gray"; // check how to add photo
    el.innerHTML = " ";
    checkZeros(cell.i, cell.j);
    console.log("test");
  }
}
function checkZeros(cellI, cellJ) {
  // here
  setMinesNegsCount(gBoard, cellI, cellJ, (cell) => {
    // micro task
    var el = document.getElementById(cell.id);
    if (el.getAttribute("data-dirty")) {
      return;
    }
    el.setAttribute("data-dirty", true);
    renderExpand(cell);
  });
}
function checkIfWin() {
  var markCount = 0;
  for (let index = 0; index < MINES.length; index++) {
    const mine = MINES[index];
    if (mine.isMarked) {
      markCount++;
    }
  }
  if (MINES.length === markCount && markCount === FLAGS_COUNT) {
    revealAll();
    alert("Good game! ✨🎉✨✨");
    gameOver();
  }
}
function RevealAllMines() {
  MINES.forEach((mine) => {
    var el = document.getElementById(mine.id);
    if (!el) {
      throw new Error("not good");
    }
    revealBombByElement(el);
  });
}

function randomMine(board) {
  var randMineI = getRandomInt(0, board.length);
  var randMinej = getRandomInt(0, board.length);
  if (board[randMineI][randMinej].isMine) {
    randomMine(board);
  } else board[randMineI][randMinej].isMine = true;
  MINES.push(board[randMineI][randMinej]);
}

function renderMine(element, i, j) {
  const isMine = checkIfMine(i, j);
  const count = getCountOfCell(i, j);
  if (isMine) {
    element.style.backgroundColor = "red";
    revealBombByElement(element);



    RevealAllMines();
    gameOver();
  } else {
    element.style.backgroundColor = "gray";
    element.innerHTML = count;
  }
}

function renderLives() {

  var elSpan = document.querySelector('.lives span')
for (var i = 0; i < gLives.length; i++) {
  var imgLife = document.createElement('IMG')
  imgLife.src = "./img/life"
  imgLife.classList.add('heart')
  elSpan.appendChild(imgLife)
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
  var elTimer = document.querySelector(".timer span");
  elTimer.innerHTML = `${display}`;
}

function gameOver() {
  // RevealAllMines();
  // revealAll()
  gLives = 3;
  MINES = [];
  gGame.firstClick = true;
  FLAGS_COUNT = 0;
  clearInterval(gInterval);
  gGame.secsPassed = 0;
  // var elTimer = document.querySelector(".timer");
  // elTimer.innerHTML = `Game time :`;
  gGame.isOn = false;
}

function revealBombByElement(element) {
  element.innerHTML = "🧨";
}

function getCountOfCell(i, j) {
  const cell = gBoard[i][j];
  const count = cell.minesAroundCount;
  return count;
}
function checkIfMine(i, j) {
  const cell = gBoard[i][j];
  const isMine = cell.isMine;
  return isMine;
}
