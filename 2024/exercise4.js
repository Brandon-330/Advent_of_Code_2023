let fs = require('fs');

function formatCoordinateTable(data) {
  let rows = data.split('\r\n');
  let table = rows.map(row => row.split(''));
  return table;
}

function checkDiagonals(table, rowIdx, colIdx) {
  let count = 0;

  if (isWordComplete(table, rowIdx, 1, colIdx, 1) && isWordComplete(table, rowIdx, -1, colIdx, 1)) {
    count += 1;
  }

  if (isWordComplete(table, rowIdx, 1, colIdx, 1) && isWordComplete(table, rowIdx, 1, colIdx, -1)) {
    count += 1;
  }


  if (isWordComplete(table, rowIdx, -1, colIdx, -1) && isWordComplete(table, rowIdx, -1, colIdx, 1)) {
    count += 1;
  }

  if (isWordComplete(table, rowIdx, -1, colIdx, -1) && isWordComplete(table, rowIdx, 1, colIdx, -1)) {
    count += 1;
  }

  return count;
}

function isWordComplete(table, i, iIncrement, j, jIncrement, str = '') {
  if (str.length === 0) {
    i += iIncrement;
    j += jIncrement;
  } else {
    i -= iIncrement;
    j -= jIncrement;
  }

  if (str.length === 3 && str === 'MAS') {
    return true;
  } else if (str.length === 3) {
    return false;
  }
  
  if (i >= table.length || i < 0 || j >= table[0].length || j < 0) {
    return false;
  }

  let letter = table[i][j];

  str += letter;

  return isWordComplete(table, i, iIncrement, j, jIncrement, str);
}

fs.readFile('input4.txt', 'utf-8', function(err, data) {
  let table = formatCoordinateTable(data);

  let result = 0;
  for (let rowIdx = 0; rowIdx < table.length; rowIdx += 1) {
    let row = table[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
      let letter = row[colIdx];
      if (letter === 'A') {
        result += checkDiagonals(table, rowIdx, colIdx);
      }
    }
  }

  console.log(result);
});



// let fs = require('fs');

// function formatCoordinateTable(data) {
//   let rows = data.split('\r\n');
//   let table = rows.map(row => row.split(''));
//   return table;
// }

// function checkAnyDirection(table, rowIdx, colIdx) {
//   let count = 0;

//   if (isWordComplete(table, rowIdx, 1, colIdx, 1)) {
//     count += 1;
//   }

//   if (isWordComplete(table, rowIdx, 1, colIdx, 0)) {
//     count += 1;
//   }

//   if (isWordComplete(table, rowIdx, 1, colIdx, -1)) {
//     count += 1;
//   }

//   if (isWordComplete(table, rowIdx, 0, colIdx, 1)) {
//     count += 1;
//   }

//   if (isWordComplete(table, rowIdx, 0, colIdx, -1)) {
//     count += 1;
//   }

//   if (isWordComplete(table, rowIdx, -1, colIdx, 1)) {
//     count += 1;
//   }

//   if (isWordComplete(table, rowIdx, -1, colIdx, 0)) {
//     count += 1;
//   }

//   if (isWordComplete(table, rowIdx, -1, colIdx, -1)) {
//     count += 1;
//   }

//   return count;
// }

// function isWordComplete(table, i, iIncrement, j, jIncrement, str = '') {
//   i += iIncrement;
//   j += jIncrement;

//   if (str.length === 3 && str === 'MAS') {
//     return true;
//   } else if (str.length === 3) {
//     return false;
//   }
  
//   if (i >= table.length || i < 0 || j >= table[0].length || j < 0) {
//     return false;
//   }

//   let letter = table[i][j];

//   str += letter;

//   return isWordComplete(table, i, iIncrement, j, jIncrement, str);
// }

// fs.readFile('input4.txt', 'utf-8', function(err, data) {
//   let table = formatCoordinateTable(data);

//   let result = 0;
//   for (let rowIdx = 0; rowIdx < table.length; rowIdx += 1) {
//     let row = table[rowIdx];
//     for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
//       let letter = row[colIdx];
//       if (letter === 'X') {
//         result += checkAnyDirection(table, rowIdx, colIdx);
//       }
//     }
//   }

//   console.log(result);
// });