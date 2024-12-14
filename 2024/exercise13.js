let fs = require('fs');

function formatClawMachines(data) {
  return data.split(/\r\n\r\n/).map(str => {
    let idx = -1;
    let hsh = {'A': {}, 'B': {}, 'result': {}};
    let clawMachine = str.split(/\r\n/).forEach(str => {
      idx += 1;
      switch (idx) {
        case 0:
          [hsh['A']['x'], hsh['A']['y']] = str.split(', ').map(str => Number(str.split('+')[1]));
        case 1:
          [hsh['B']['x'], hsh['B']['y']] = str.split(', ').map(str => Number(str.split('+')[1]));
        case 2:
          [hsh.result.x, hsh.result.y] = str.split(', ').map(str => Number(str.split('=')[1]));
      }
    });

    return hsh;
  });
}

fs.readFile('input13.txt', 'utf-8', (error, data) => {
  let clawMachines = formatClawMachines(data);
  clawMachines.map(hsh => {
    let dp = [[]]
  })
});