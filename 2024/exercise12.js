let fs = require('fs');

function formatCoordinateTable(data) {
  let rows = data.split('\r\n');
  let table = rows.map(row => row.split(''));
  return table;
}

function recurse(table, i, j, area = 0, perimeter = 0) {
  if (i < 0 || j < 0 || i >= table.length || j >= table[0].length) {
    return [perimeter, area];
  } else {

  }
}

fs.readFile('input12.txt', (error, data) => {
  let table = formatCoordinateTable(data);
});