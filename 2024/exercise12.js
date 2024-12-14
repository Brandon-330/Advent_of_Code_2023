let fs = require('fs');

function formatCoordinateTable(data) {
  let rows = data.split('\r\n');
  let table = rows.map(row => row.split(''));
  return table;
}

function checkAround(table, i, j, str, result = {}) {
  result.visited = result.visited ?? {};
  result.area = result.area ?? 0;
  result.sides = result.sides ?? [];

  if ((i < 0 || j < 0 || i >= table.length || j >= table[0].length)) {
    result.sides.push([i, j])
  } else if (result.visited[[i, j]]) {
    return;
  } else if (table[i][j] !== str) {
    result.sides.push([i, j]);
  } else {
    result.visited[[i, j]] = 'visited';
    result.area += 1;

    checkAround(table, i + 1, j, str, result)
    checkAround(table, i - 1, j, str, result)
    checkAround(table, i, j + 1, str, result)
    checkAround(table, i, j - 1, str, result)

    return result;
  }

  return;
}

function countSides(sides) {
  let arr = sides;
  let result = 0;
  while (sides.length > 0) {
    let [iExistingSide, jExistingSide] = sides.shift();
    if (arr.some(arr => {
          let [iCurrent, jCurrent] = arr;
          return (
            iExistingSide + 1 === iCurrent && jExistingSide === jCurrent || 
            iExistingSide - 1 === iCurrent && jExistingSide === jCurrent ||
            iExistingSide === iCurrent && jExistingSide + 1 === jCurrent ||
            iExistingSide === iCurrent && jExistingSide - 1 === jCurrent
          )
       })
    ) {} else {
      result += 1;
    }
  };

  return result;
}

function formatVisitedCoordinatesToTableCoordinates(visitedStr) {
  return visitedStr.map(str => {
    return str.split(',').map(Number);
  });
}

function fillVisited(table, visitedCoordinates) {
  visitedCoordinates.forEach(coord => {
    let [i, j] = coord;

    table[i][j] = '#';
  });
}

fs.readFile('input12.txt', 'utf-8', (error, data) => {
  let table = formatCoordinateTable(data);
  let total = 0;
  for (let rowIdx = 0; rowIdx < table.length; rowIdx += 1) {
    let row = table[rowIdx];

    for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
      let char = row[colIdx];

      if (char !== '#') {
        let result = checkAround(table, rowIdx, colIdx, char);
        let sides = countSides(result.sides);
        console.log(result, sides);
        let visitedCoordinates = formatVisitedCoordinatesToTableCoordinates(Object.keys(result.visited));

        total += (sides * result.area);
        fillVisited(table, visitedCoordinates);
      }
    }
  }

  console.log(total);
});




// let fs = require('fs');

// function formatCoordinateTable(data) {
//   let rows = data.split('\r\n');
//   let table = rows.map(row => row.split(''));
//   return table;
// }

// function checkAround(table, i, j, str, result = {}) {
//   result.visited = result.visited ?? {};
//   result.area = result.area ?? 0;
//   result.perimeter = result.perimeter ?? 0;

//   if (i < 0 || j < 0 || i >= table.length || j >= table[0].length) {
//     result.perimeter += 1;
//   } else if (result.visited[[i, j]]) {
//     return;
//   } else if (table[i][j] !== str) {
//     result.perimeter += 1;
//   } else {
//     result.visited[[i, j]] = 'visited';
//     result.area += 1;

//     checkAround(table, i + 1, j, str, result)
//     checkAround(table, i - 1, j, str, result)
//     checkAround(table, i, j + 1, str, result)
//     checkAround(table, i, j - 1, str, result)

//     return result;
//   }

//   return;
// }

// function formatVisitedCoordinatesToTableCoordinates(visitedStr) {
//   return visitedStr.map(str => {
//     return str.split(',').map(Number);
//   });
// }

// function fillVisited(table, visitedCoordinates) {
//   visitedCoordinates.forEach(coord => {
//     let [i, j] = coord;

//     table[i][j] = '#';
//   });
// }

// fs.readFile('input12.txt', 'utf-8', (error, data) => {
//   let table = formatCoordinateTable(data);
//   let total = 0;
//   for (let rowIdx = 0; rowIdx < table.length; rowIdx += 1) {
//     let row = table[rowIdx];

//     for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
//       let char = row[colIdx];

//       if (char !== '#') {
//         let result = checkAround(table, rowIdx, colIdx, char);
//         let visitedCoordinates = formatVisitedCoordinatesToTableCoordinates(Object.keys(result.visited));
        
//         total += (result.perimeter * result.area);
//         fillVisited(table, visitedCoordinates);
//       }
//     }
//   }

//   console.log(total);
// });