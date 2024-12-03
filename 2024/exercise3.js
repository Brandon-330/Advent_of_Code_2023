function effectiveMults(str) {
  let arr = [];
  while (str.includes('do()')) {
    let matchIdx = str.lastIndexOf('do()');
    arr.push(str.slice(matchIdx));
    str = str.slice(0, matchIdx);
  }

  arr = arr.map(str => {
    while (str.includes("don't()")) {
      let matchIdx = str.indexOf("don't()");
      arr.push(str.slice(0, matchIdx));
      str = str.slice(0, matchIdx);
    }

    return str;
  });

  return arr
}

function acceptableMults(str) {
  return str.match(/mul\([0-9]+,[0-9]+\)/g);
}

function parseMults(multsArr) {
  return multsArr.map(str => str.match(/[0-9]+/g));
}

let fs = require('fs');

fs.readFile('input3.txt', 'utf-8', function(err, data) {
  data = 'do()' + data;
  let workingMults = effectiveMults(data);
  console.log(workingMults);
  workingMults = workingMults.join('')
  let mults = acceptableMults(workingMults);
  let parsedMults = parseMults(mults);
  let result = parsedMults.map(numArr => Number(numArr[0]) * Number(numArr[1])).reduce((sum, num) => sum + num, 0);
  console.log(result);
});

// function acceptableMults(str) {
//   return str.match(/mul\([0-9]+,[0-9]+\)/g);
// }

// function parseMults(multsArr) {
//   return multsArr.map(str => str.match(/[0-9]+/g));
// }

// let fs = require('fs');

// fs.readFile('input3.txt', 'utf-8', function(err, data) {
//   let mults = acceptableMults(data);
//   let parsedMults = parseMults(mults);
//   let result = parsedMults.map(numArr => Number(numArr[0]) * Number(numArr[1])).reduce((sum, num) => sum + num, 0);
//   console.log(result);
// });