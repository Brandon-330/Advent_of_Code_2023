let fs = require('fs');

let COUNTER = 0;

function formatCoordinateTable(data) {
  let rows = data.split('\r\n');
  let table = rows.map(row => row.split(''));
  return table;
}

function iterateTable(table, Cb) {
  table.forEach(row => {
    row.forEach(Cb);
  });
}

function colContains(table, i, j, direction) {
  let col = [];
  for (let rowIdx = 0; rowIdx < table.length; rowIdx += 1) {
    let row = table[rowIdx];
    col.push(row[j]);
  }

  let effectiveCol;
  if (direction === 'U') {
    effectiveCol = col.slice(0, i);
    effectiveCol = col.slice(effectiveCol.lastIndexOf('#') === -1 ? 0 : effectiveCol.lastIndexOf('#'), effectiveCol.length);
  } else {
    effectiveCol = col.slice(i);
    effectiveCol = effectiveCol.slice(0, (effectiveCol.indexOf('#') === -1 ? effectiveCol.length : effectiveCol.indexOf('#')));
    console.log(effectiveCol.join(''));

  }

  return effectiveCol.some(el => el === direction);
}

function rowContains(table, i, j, direction) {
  let row = table[i];
  let effectiveRow;
  if (direction === 'R') {
    effectiveRow = row.slice(j);
    effectiveRow = effectiveRow.slice(0, ((effectiveRow.indexOf('#') === -1 ? effectiveRow.length : effectiveRow.indexOf('#'))));
  } else {
    effectiveRow = row.slice(0, j);
    effectiveRow = effectiveRow.slice((effectiveRow.lastIndexOf('#') === -1 ? 0 : effectiveRow.lastIndexOf('#')), effectiveRow.length);
  }

  return effectiveRow.some(el => el === direction);
}

function isOutsideBounds(table, i, j) {
  if (i < 0 || i >= table.length || j < 0 || j >= table[0].length) {
    return true;
  }

  return false
}

function fillTable(table, i, j, direction = 'up') {
  if (isOutsideBounds(table, i, j)) {
    return;
  } else if (table[i][j] === '^') {
    table[i][j] = 'U';
  }

  while (['R', 'D', 'U', 'L', 'O', '.'].includes(table[i][j])) {
    switch(direction) {
      case('up'):
        if (isOutsideBounds(table, i - 1, j)) {
          return;
        } else {
          if (rowContains(table, i, j, 'R')) {
            COUNTER += 1;
            // table[i - 1][j] = 'O';
          } else if (table[i][j] !== 'O') {
            table[i][j] = 'U';
          }

          table[i][j] = 'U';
          i -= 1;
        }
  
        break;
      case('down'):
        if (isOutsideBounds(table, i + 1, j)) {
          return;
        } else {
          if (rowContains(table, i, j, 'L')) {
            COUNTER += 1;
            // table[i + 1][j] = 'O';
          } else if (table[i][j] !== 'O') {
            table[i][j] = 'D';
          }

          table[i][j] = 'D';
          i += 1;
        }
  
        break;
      case('left'):
        if (isOutsideBounds(table, i, j - 1)) {
          return;
        } else {
          if (colContains(table, i, j, 'U')) {
            COUNTER += 1;
            // table[i][j - 1] = 'O';
          } else if (table[i][j] !== 'O') {
            table[i][j] = 'L';
          }

          table[i][j] = 'L';
          j -= 1;
        }
  
        break;
      case('right'):
        if (isOutsideBounds(table, i, j + 1)) {
          return;
        } else {
          if (colContains(table, i, j, 'D')) {
            COUNTER += 1;
            // table[i][j + 1] = 'O';
          } else if (table[i][j] !== 'O') {
            table[i][j] = 'R';
          }

          table[i][j] = 'R';
          j += 1;
        }
  
        break;
    }
  }
  
  switch(direction) {
    case('up'):
      if (colContains(table, i + 1, j, 'D')) {
        COUNTER += 1;
      }

      fillTable(table, i + 1, j + 1, 'right');

      break;
    case('down'):
      if (colContains(table, i - 1, j, 'U')) {
        COUNTER += 1;
      }
      fillTable(table, i - 1, j - 1, 'left');

      break;
    case('left'):
      if (rowContains(table, i, j + 1, 'R')) {
        COUNTER += 1;
      }
      fillTable(table, i - 1, j + 1, 'up');

      break;
    case('right'):
      if (rowContains(table, i, j - 1, 'L')) {
        COUNTER += 1;
      }
      fillTable(table, i + 1, j - 1, 'down');

      break;
  }
}

fs.readFile('input6.txt', 'utf-8', function(err, data) {
  let table = formatCoordinateTable(data);

  for (let rowIdx = 0; rowIdx < table.length; rowIdx += 1) {
    let row = table[rowIdx];

    for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
      let space = row[colIdx];

      if (space === '^') {
        fillTable(table, rowIdx, colIdx);
      }
    }
  }

  fs.writeFile('output6.txt', table.map(row => row.join('')).join('\n'), function () {});
  console.log(COUNTER);
});




// let fs = require('fs');

// function formatCoordinateTable(data) {
//   let rows = data.split('\r\n');
//   let table = rows.map(row => row.split(''));
//   return table;
// }

// function iterateTable(table, Cb) {
//   table.forEach(row => {
//     row.forEach(Cb);
//   });
// }

// function isOutsideBounds(table, i, j) {
//   if (i < 0 || i >= table.length || j < 0 || j >= table[0].length) {
//     return true;
//   }

//   return false
// }

// function fillTable(table, i, j, direction = 'up') {
//   if (isOutsideBounds(table, i, j)) {
//     console.log(i, j);
//     return
//   }

//   table[i][j] = 'X';

//   while (table[i][j] === 'X' || table[i][j] === '.') {
//     switch(direction) {
//       case('up'):
//         if (isOutsideBounds(table, i - 1, j)) {
//           return;
//         } else {
//           table[i][j] = 'X';
//           i -= 1;
//         }
  
//         break;
//       case('down'):
//         if (isOutsideBounds(table, i + 1, j)) {
//           return;
//         } else {
//           table[i][j] = 'X';
//           i += 1;
//         }
  
//         break;
//       case('left'):
//         if (isOutsideBounds(table, i, j - 1)) {
//           return;
//         } else {
//           table[i][j] = 'X';
//           j -= 1;
//         }
  
//         break;
//       case('right'):
//         if (isOutsideBounds(table, i, j + 1)) {
//           return;
//         } else {
//           table[i][j] = 'X';
//           j += 1;
//         }
  
//         break;
//     }
//   }
  

//   switch(direction) {
//     case('up'):
//       fillTable(table, i + 1, j, 'right');

//       break;
//     case('down'):
//       fillTable(table, i - 1, j, 'left');

//       break;
//     case('left'):
//       fillTable(table, i, j + 1, 'up')

//       break;
//     case('right'):
//       fillTable(table, i, j - 1, 'down')

//       break;
//   }
// }

// fs.readFile('input6.txt', 'utf-8', function(err, data) {
//   let table = formatCoordinateTable(data);
//   for (let rowIdx = 0; rowIdx < table.length; rowIdx += 1) {
//     let row = table[rowIdx];

//     for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
//       let space = row[colIdx];

//       if (space === '^') {
//         fillTable(table, rowIdx, colIdx);
//       }
//     }
//   }

//   let result = 0;
//   iterateTable(table, function (el) {
//     if (el === 'X') {
//       result += 1;
//     }
//   });

//   fs.writeFile('output6.txt', table.map(row => row.join('')).join('\n'), function () {});
//   console.log(result + 1);
// });