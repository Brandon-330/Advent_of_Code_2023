let fs = require('fs');

function formatTesting(data) {
  let lines = data.split('\r\n');
  let testValues = lines.map((line) => Number(line.split(':')[0]));
  let numbers = lines.map((line) => line.split(': ')[1].split(' '));

  return [testValues, numbers];
}

function testForValue(strArr, testValue, num = 0) {
  if (num > testValue) {
    return false;
  } else if (String(num).length > String(testValue).length) {
    return false;
  } else if (num === testValue && strArr.length === 0) {
    return true;
  } else if (strArr.length === 0) {
    return false;
  }

  let firstNum = strArr[0];

  return (testForValue(strArr.slice(1), testValue, num + Number(firstNum)) 
  || testForValue(strArr.slice(1), testValue, (num || 1) * Number(firstNum)) 
  || testForValue(strArr.slice(1), testValue, Number(String(num || '') + firstNum)));
}

fs.readFile('input7.txt', 'utf-8', function(err, data) {
  let [testValues, nums] = formatTesting(data);

  let idx = -1;
  let result = testValues.filter(testValue => {
    idx += 1;
    return testForValue(nums[idx], testValue);
  });

  console.log(result);

  console.log(result.reduce((sum, num) => sum + num, 0));
});

// let fs = require('fs');

// function formatTesting(data) {
//   let lines = data.split('\r\n');
//   let testValues = lines.map((line) => Number(line.split(':')[0]));
//   let numbers = lines.map((line) => line.split(': ')[1].split(' ').map(str => Number(str)));

//   return [testValues, numbers];
// }

// function testForValue(numsArr, testValue) {
//   if (testValue < 0) {
//     return false;
//   } else if (testValue === 0) {
//     return true;
//   } else if (numsArr.length === 0) {
//     return false;
//   }

//   let lastNum = numsArr[numsArr.length - 1];
//   return testForValue(numsArr.slice(0, numsArr.length - 1), testValue / lastNum) || testForValue(numsArr.slice(0, numsArr.length - 1), testValue - lastNum);
// }

// fs.readFile('input7.txt', 'utf-8', function(err, data) {
//   let [testValues, nums] = formatTesting(data);

//   let idx = -1;
//   let result = testValues.filter(testValue => {
//     idx += 1;
//     return testForValue(nums[idx], testValue);
//   });

//   console.log(result);

//   console.log(result.reduce((sum, num) => sum + num, 0));
// });