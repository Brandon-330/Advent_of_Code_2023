function isAllDecreasing(arr) {
  let idx1 = -1;
  for (let idx2 = 1; idx2 < arr.length; idx2 += 1) {
    idx1 += 1;
    if (arr[idx1] <= arr[idx2]) {
      return false;
    }
  }

  return true;
}

function isAllIncreasing(arr) {
  let idx1 = -1;
  for (let idx2 = 1; idx2 < arr.length; idx2 += 1) {
    idx1 += 1;
    if (arr[idx1] >= arr[idx2]) {
      return false;
    }
  }

  return true;
}

function isDifferenceOfOneAtMostThree(arr) {
  let idx1 = -1;
  for (let idx2 = 1; idx2 < arr.length; idx2 += 1) {
    idx1 += 1;
    if (Math.abs(arr[idx1] - arr[idx2]) > 3) {
      return false;
    }
  }

  return true;
}

function criteria(arr) {
  return (isAllDecreasing(arr) || isAllIncreasing(arr)) && isDifferenceOfOneAtMostThree(arr)
}

let fs = require('fs');

fs.readFile('input2.txt', 'utf-8', function(err, data) {
  let levels = data.split(/\r\n/);
  let nestedLevels = levels.map(level => level.split(' ').map(str => Number(str)));
  let safeLevels = nestedLevels.filter(level => {
    if (!criteria(level)) {
      for (let idx = 0; idx < level.length; idx += 1) {
        let slicedArr = level.slice(0, idx).concat(level.slice(idx + 1, level.length));
        if (criteria(slicedArr)) {
          return true;
        }
      }

      return false;
    } else {
      return true;
    }
  });

  console.log(safeLevels.length);
});


// function isAllDecreasing(arr) {
//   let idx1 = -1;
//   for (let idx2 = 1; idx2 < arr.length; idx2 += 1) {
//     idx1 += 1;
//     if (arr[idx1] <= arr[idx2]) {
//       return false;
//     }
//   }

//   return true;
// }

// function isAllIncreasing(arr) {
//   let idx1 = -1;
//   for (let idx2 = 1; idx2 < arr.length; idx2 += 1) {
//     idx1 += 1;
//     if (arr[idx1] >= arr[idx2]) {
//       return false;
//     }
//   }

//   return true;
// }

// function isDifferenceOfOneAtMostThree(arr) {
//   let idx1 = -1;
//   for (let idx2 = 1; idx2 < arr.length; idx2 += 1) {
//     idx1 += 1;
//     if (Math.abs(arr[idx1] - arr[idx2]) > 3) {
//       return false;
//     }
//   }

//   return true;
// }

// function criteria(arr) {
//   return (isAllDecreasing(arr) || isAllIncreasing(arr)) && isDifferenceOfOneAtMostThree(arr)
// }

// let fs = require('fs');

// fs.readFile('input2.txt', 'utf-8', function(err, data) {
//   let levels = data.split(/\r\n/);
//   let nestedLevels = levels.map(level => level.split(' ').map(str => Number(str)));
//   let safeLevels = nestedLevels.filter(level => {
//     return criteria(level);
//   });

//   console.log(safeLevels.length);
// });
