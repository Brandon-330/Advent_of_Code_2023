let fs = require('fs');

function formatCoordinateTable(data) {
  let rows = data.split('\r\n');
  let table = rows.map(row => row.split(''));
  return table;
}

function iterateThroughTable(table, Cb) {
  for (let rowIdx = 0; rowIdx < table.length; rowIdx += 1) {
    let row = table[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
      let el = row[colIdx];
      Cb(el, rowIdx, colIdx);
    }
  }
}

function searchForAntennaPositions(table) {
  let hsh = {};

  iterateThroughTable(table, function(el, rowIdx, colIdx) {
    if (el !== '.') {
      if (!hsh[el]) {
        hsh[el] = [];
      }

      hsh[el].push([rowIdx, colIdx]);
    }
  });

  return hsh;
}

function isOutsideBounds(table, i, j) {
  if (i < 0 || i >= table.length || j < 0 || j >= table[0].length) {
    return true;
  }

  return false
}

function fillHashes(table, arr) {
  while (arr.length > 0) {
    let firstCoordinate = arr.shift();
    let [iFirst, jFirst] = firstCoordinate;

    // Antennas themselves are also antinodes
    table[iFirst][jFirst] = '#';

    arr.forEach(otherCoordinate => {
      let [iOther, jOther] = otherCoordinate;
      let iDiff = iOther - iFirst;
      let jDiff = jOther - jFirst;

      let hshPos1 = [iFirst - iDiff, jFirst - jDiff];
      while (!isOutsideBounds(table, hshPos1[0], hshPos1[1])) {
        let [i, j] = hshPos1;
        table[i][j] = '#';
        hshPos1[0] -= iDiff;
        hshPos1[1] -= jDiff;
      }

      let hshPos2 = [iOther + iDiff, jOther + jDiff];
      while (!isOutsideBounds(table, hshPos2[0], hshPos2[1])) {
        let [i, j] = hshPos2;
        table[i][j] = '#';
        hshPos2[0] += iDiff;
        hshPos2[1] += jDiff;
      }

    });
  }
}

fs.readFile('input8.txt', 'utf-8', function(err, data) {
  let table = formatCoordinateTable(data);
  let hsh = searchForAntennaPositions(table);
  Object.values(hsh).forEach((arr) => fillHashes(table, arr));

  let result = 0;
  iterateThroughTable(table, function(el, i, j) {
    if (el === '#') {
      result += 1;
    }
  });

  console.log(table.join('\r\n'));
  console.log(result);
});




// let fs = require('fs');

// function formatCoordinateTable(data) {
//   let rows = data.split('\r\n');
//   let table = rows.map(row => row.split(''));
//   return table;
// }

// function iterateThroughTable(table, Cb) {
//   for (let rowIdx = 0; rowIdx < table.length; rowIdx += 1) {
//     let row = table[rowIdx];
//     for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
//       let el = row[colIdx];
//       Cb(el, rowIdx, colIdx);
//     }
//   }
// }

// function searchForAntennaPositions(table) {
//   let hsh = {};

//   iterateThroughTable(table, function(el, rowIdx, colIdx) {
//     if (el !== '.') {
//       if (!hsh[el]) {
//         hsh[el] = [];
//       }

//       hsh[el].push([rowIdx, colIdx]);
//     }
//   });

//   return hsh;
// }

// function isOutsideBounds(table, i, j) {
//   if (i < 0 || i >= table.length || j < 0 || j >= table[0].length) {
//     return true;
//   }

//   return false
// }

// function fillHashes(table, arr) {
//   while (arr.length > 0) {
//     let firstCoordinate = arr.shift();
//     let [iFirst, jFirst] = firstCoordinate;

//     arr.forEach(otherCoordinate => {
//       let [iOther, jOther] = otherCoordinate;
//       let iDiff = iOther - iFirst;
//       let jDiff = jOther - jFirst;
      
//       let hshPos = [[iFirst - iDiff, jFirst - jDiff], [iOther + iDiff, jOther + jDiff]];
//       hshPos.forEach(hshPosition => {
//         let [i, j] = hshPosition;
//         if (!isOutsideBounds(table, i, j)) {
//           table[i][j] = '#';
//         }
//       })
//     });
//   }
// }

// fs.readFile('input8.txt', 'utf-8', function(err, data) {
//   let table = formatCoordinateTable(data);
//   let hsh = searchForAntennaPositions(table);
//   Object.values(hsh).forEach((arr) => fillHashes(table, arr));

//   let result = 0;
//   iterateThroughTable(table, function(el, i, j) {
//     if (el === '#') {
//       result += 1;
//     }
//   });

//   console.log(table.join('\r\n'));
//   console.log(result);
// });