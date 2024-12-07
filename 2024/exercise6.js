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

function colContains(table, j, direction) {
  for (let rowIdx = 0; rowIdx < table.length; rowIdx += 1) {
    let row = table[rowIdx];
    if (row[j] === direction) {
      return true;
    }
  }

  return false;
}

function rowContains(table, i, direction) {
  return table[i].some(el => el === direction);
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
  }

  switch(direction) {
    case('up'):
      table[i][j] = 'U';

      break;
    case('down'):
      table[i][j] = 'D';

      break;
    case('left'):
      table[i][j] = 'L';

      break;
    case('right'):
      table[i][j] = 'R';

      break;
  }

  while (['R', 'D', 'U', 'L', 'O', '.'].includes(table[i][j])) {
    switch(direction) {
      case('up'):
        if (isOutsideBounds(table, i - 1, j)) {
          return;
        } else {
          if (rowContains(table, i, 'R')) {
            COUNTER += 1;
            table[i][j] = 'O';
          } else {
            table[i][j] = 'U';
          }

          i -= 1;
        }
  
        break;
      case('down'):
        if (isOutsideBounds(table, i + 1, j)) {
          return;
        } else {
          if (rowContains(table, i, 'L')) {
            COUNTER += 1;
            table[i][j] = 'O';
          } else {
            table[i][j] = 'D';
          }

          i += 1;
        }
  
        break;
      case('left'):
        if (isOutsideBounds(table, i, j - 1)) {
          return;
        } else {
          if (colContains(table, j, 'U')) {
            COUNTER += 1;
            table[i][j] = 'O';
          } else {
            table[i][j] = 'L';
          }

          j -= 1;
        }
  
        break;
      case('right'):
        if (isOutsideBounds(table, i, j + 1)) {
          return;
        } else {
          if (colContains(table, j, 'D')) {
            COUNTER += 1;
            table[i][j] = 'O';
          } else {
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
      table[i + 1][j] = 'U';
      fillTable(table, i + 1, j, 'right');

      break;
    case('down'):
      table[i - 1][j] = 'D';
      fillTable(table, i - 1, j, 'left');

      break;
    case('left'):
      table[i][j + 1] = 'L';
      fillTable(table, i, j + 1, 'up');

      break;
    case('right'):
      table[i][j - 1] = 'R';
      fillTable(table, i, j - 1, 'down');

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