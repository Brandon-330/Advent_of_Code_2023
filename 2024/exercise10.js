let fs = require('fs');

function formatCoordinateTable(data) {
  let rows = data.split('\r\n');
  let table = rows.map(row => row.split(''));
  return table;
}

function pathsToPeak(table, i, j, num = 0) {
  if (i < 0 || j < 0 || i >= table.length || j >= table[0].length) {
    return 0;
  } else if (Number(table[i][j]) === 9 && num === 9) {
    return 1;
  } else if (Number(table[i][j]) === num) {
    let newNum = num + 1;
    return (
      pathsToPeak(table, i - 1, j, newNum) +
      pathsToPeak(table, i + 1, j, newNum) +
      pathsToPeak(table, i, j - 1, newNum) +
      pathsToPeak(table, i, j + 1, newNum)
    );
  } else {
    return 0;
  }
}

fs.readFile('input10.txt', 'utf-8', function(err, data) {
  let table = formatCoordinateTable(data);

  let result = 0;
  for (let rowIdx = 0; rowIdx < table.length; rowIdx += 1) {
    let row = table[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
      let el = row[colIdx];

      if (el === '0') {
        result += pathsToPeak(table, rowIdx, colIdx);
      }
    }
  }

  console.log(result);
});