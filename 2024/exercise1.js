let fs = require('fs');

fs.readFile('input1.txt', 'utf-8', function(err, data) {
  let arr = data.split(/\s+/);
  let firstColumn = [];
  let secondColumn = [];
  arr.forEach((num, idx) => {
    if (idx % 2 === 0) {
      firstColumn.push(num);
    } else {
      secondColumn.push(num);
    }
  });

  let freqHash = {};
  let result = firstColumn.map(num => {
    if (!freqHash[num]) {
      let counter = 0;
      secondColumn.forEach(secondNum => {
        if (num === secondNum) {
          counter += 1;
        }
      });
      freqHash[num] = counter;
    }

    return freqHash[num] * num;
  })

  let sum = result.reduce((sum, num) => sum + num, 0);
  console.log(sum);
});




// let fs = require('fs');

// fs.readFile('input1.txt', 'utf-8', function(err, data) {
//   let arr = data.split(/\s+/);
//   let firstColumn = [];
//   let secondColumn = [];
//   arr.forEach((num, idx) => {
//     if (idx % 2 === 0) {
//       firstColumn.push(num);
//     } else {
//       secondColumn.push(num);
//     }
//   });

//   firstColumn.sort((a, b) => Number(a) - Number(b));
//   secondColumn.sort((a, b) => Number(a) - Number(b));

//   let idx = -1;
//   let result = firstColumn.map(firstNum => {
//     idx += 1;
//     secondNum = secondColumn[idx];
//     return Math.abs(firstNum - secondNum);
//   });

//   let sum = result.reduce((sum, num) => sum + num, 0);
//   console.log(sum);
// });