function renderBoard(mat, selector) {
  var strHTML = "";
  for (var i = 0; i < mat.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < mat[0].length; j++) {
       var currCell = mat[i][j]
      strHTML += `<td
                data-i="${i}" data-j="${j}"
                onclick="cellClicked(this,${i},${j})">${currCell}</td>`;
    }
    strHTML += "</tr>";
  }
  var elBoard = document.querySelector(selector);
  elBoard.innerHTML = strHTML;
}

// // location such as: {i: 2, j: 7}
// function renderCell(location, value) {
//   // Select the elCell and set the value
//   var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
//   elCell.innerHTML = value;
// }

// function getRandomIntInclusive(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

// function shuffle(items) {
//   var randIdx, keep, i;
//   for (i = items.length - 1; i > 0; i--) {
//     randIdx = getRandomIntInclusive(0, items.length - 1);

//     keep = items[i];
//     items[i] = items[randIdx];
//     items[randIdx] = keep;
//   }
//   return items;
// }

// function getClassName(location) {
//   var cellClass = "cell-" + location.i + "-" + location.j;
//   return cellClass;
// }

