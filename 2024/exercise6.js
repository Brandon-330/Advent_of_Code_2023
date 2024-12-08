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

function isLoopable(table, i, j, direction = 'up', hsh = {}, hashtagPos = '', startPos = true) {
  if (isOutsideBounds(table, i, j)) {
    return false;
  }

  if (startPos) {
    startPos = false;

    switch(direction) {
      case ('right'):
        hashtagPos = [i - 1, j, table[i - 1][j]];
        table[i - 1][j] = '#';
        
        // hsh[i - 1, j] = 'O';
        break;
      case ('left'):
        hashtagPos = [i + 1, j, table[i + 1][j]];        
        table[i + 1][j] = '#'
        // hsh[i + 1, j] = 'O';
        break;
      case ('up'):
        hashtagPos = [i, j - 1, table[i][j - 1]];
        table[i][j - 1] = '#';
        // hsh[i, j - 1] = 'O';
        break;
      case ('down'):
        hashtagPos = [i, j + 1, table[i][j + 1]];
        table[i][j + 1] = '#';
        // hsh[i, j + 1] = 'O';
        break;
    }
  }


  while (['R', 'D', 'U', 'L', '.'].includes(table[i][j])) {
    if ((hsh[[i, j]] && hsh[[i, j]] === direction)) {
      let [iHash, jHash, el] = hashtagPos;
      table[iHash][jHash] = el;
      return true;
    } else if (!hsh[[i, j]]) {
      hsh[[i, j]] = direction;
    }

    switch(direction) {
      case('up'):
        if (isOutsideBounds(table, i - 1, j)) {
          let [iHash, jHash, el] = hashtagPos;
          table[iHash][jHash] = el;
          return false;
        } else {

          i -= 1;
        }
  
        break;
      case('down'):
        if (isOutsideBounds(table, i + 1, j)) {
          let [iHash, jHash, el] = hashtagPos;
          table[iHash][jHash] = el;
          return false;
        } else {

          i += 1;
        }
  
        break;
      case('left'):
        if (isOutsideBounds(table, i, j - 1)) {
          let [iHash, jHash, el] = hashtagPos;
          table[iHash][jHash] = el;
          return false;
        } else {

          j -= 1;
        }
  
        break;
      case('right'):
        if (isOutsideBounds(table, i, j + 1)) {
          let [iHash, jHash, el] = hashtagPos;
          table[iHash][jHash] = el;
          return false;
        } else {

          j += 1;
        }
  
        break;
    }
  }
  
  switch(direction) {
    case('up'):
      return isLoopable(table, i + 1, j, 'right', hsh, hashtagPos, false);

    case('down'):
      return isLoopable(table, i - 1, j, 'left', hsh, hashtagPos, false);

    case('left'):
      return isLoopable(table, i, j + 1, 'up', hsh, hashtagPos, false);

    case('right'):
      return isLoopable(table, i, j - 1, 'down', hsh, hashtagPos, false);
  }
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

  while (['R', 'D', 'U', 'L', '.'].includes(table[i][j])) {
    switch(direction) {
      case('up'):
        if (isOutsideBounds(table, i - 1, j)) {
          return;
        } else {
          if (isLoopable(table, i, j, 'right')) {
            COUNTER += 1;
          }

          table[i][j] = 'U';
          i -= 1;
        }
  
        break;
      case('down'):
        if (isOutsideBounds(table, i + 1, j)) {
          return;
        } else {
          if (isLoopable(table, i, j, 'left')) {
            COUNTER += 1;
          }

          table[i][j] = 'D';
          i += 1;
        }
  
        break;
      case('left'):
        if (isOutsideBounds(table, i, j - 1)) {
          return;
        } else {
          if (isLoopable(table, i, j, 'up')) {
            COUNTER += 1;
          }
          
          table[i][j] = 'L';
          j -= 1;
        }
  
        break;
      case('right'):
        if (isOutsideBounds(table, i, j + 1)) {
          return;
        } else {
          if (isLoopable(table, i, j, 'down')) {
            COUNTER += 1;
          }

          table[i][j] = 'R';
          j += 1;
        }
  
        break;
    }
  }
  
  switch(direction) {
    case('up'):
      if (isLoopable(table, i + 1, j, 'down')) {
        COUNTER += 1;
      }
      fillTable(table, i + 1, j + 1, 'right');

      break;
    case('down'):
      if (isLoopable(table, i - 1, j, 'up')) {
        COUNTER += 1;
      }
      fillTable(table, i - 1, j - 1, 'left');

      break;
    case('left'):
      if (isLoopable(table, i, j + 1, 'right')) {
        COUNTER += 1;
      }
      fillTable(table, i - 1, j + 1, 'up');

      break;
    case('right'):
      if (isLoopable(table, i, j - 1, 'left')) {
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