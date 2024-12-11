let fs = require('fs')

function idxOfEffectiveBlanks(arr, lengthCriteria, boundingIdx) {
  for (let i = 0; i < arr.length - lengthCriteria; i += 1) {
    if (i < boundingIdx && arr.slice(i, i + lengthCriteria).every(el => el === '.')) {
      return i;
    }
  }
}

function determineLengthGoingBackwards(line, str, idx) {
  let result = 0;
  while (line[idx] === str) {
    result += str.length;
    idx -= 1;
  }

  return result;
}

fs.readFile('input9.txt', 'utf-8', function(err, data) {
  let result = [];
  let iteratingIds = -1;
  for (let idx = 0; idx < data.length; idx += 1) {
    let char = data[idx];
    if (idx % 2 === 0) {
      iteratingIds += 1;
      for (let _ = 0; _ < Number(char); _ += 1) {
        result.push(String(iteratingIds));
      }
    } else {
      for (let _ = 0; _ < Number(char); _ += 1) {
        result.push('.');
      }
    }
  }

  for (let idx = result.length - 1; idx > 0; idx -= 1) {
    let str = result[idx];

    if (str.match(/[0-9]/)) {
      let lengthOfRightFile = determineLengthGoingBackwards(result, str, idx);
      let effectiveLengthOfRightFile = (lengthOfRightFile / str.length);

      let effectiveIdx = idxOfEffectiveBlanks(result, effectiveLengthOfRightFile, idx);


      if (!effectiveIdx) {
        idx -= (effectiveLengthOfRightFile - 1);
      } else if (effectiveIdx) {

        for (let _ = 0; _ < effectiveLengthOfRightFile; _ += 1) {
          result[effectiveIdx + _] = str;
        }

        for (let _ = 0; _ < effectiveLengthOfRightFile; _ += 1) {
          result[idx - _] = '.';
        }
      } 
    }
  }

  iteratingIds = -1;
  let total = 0;
  result.forEach((num) => {
    iteratingIds += 1;
    if (!num.includes('.')) {
      total += (iteratingIds * Number(num));
    }
  });

  console.log(result, total)
});




// let fs = require('fs')

// function isEmptyIdx(idx) {
//   return idx % 2 !== 0;
// }

// function formatNumberOfIdsAndNumberOfDots(str) {
//   let numberOfIds = [];
//   let numberOfSpaces = [];
//   for (let idx = 0; idx < str.length; idx += 1) {
//     if (!isEmptyIdx(idx)) {
//       numberOfIds.push(Number(str[idx]));
//     } else {
//       numberOfSpaces.push(Number(str[idx]));
//     }
//   }

//   return [numberOfIds, numberOfSpaces];
// }

// fs.readFile('input9.txt', 'utf-8', function(err, data) {
//   let input = data;
//   let [numberOfIds, numberOfSpaces] = formatNumberOfIdsAndNumberOfDots(data);
//   let totalUniqueIds = numberOfIds.length - 1;

//   let result = [];
//   let id = 0;
//   while (numberOfIds.length > 0) {
//     let freq = numberOfIds.shift();
//     let freqSpaces = numberOfSpaces.shift();
//     for (let i = 0; i < freq; i += 1) {
//       result.push(id);
//     }

//     id += 1;

//     for (let i = 0; i < freqSpaces; i += 1) {
//       let lastNumberOfIds = numberOfIds[numberOfIds.length - 1];
//       if (lastNumberOfIds > 0) {
//         result.push(totalUniqueIds);
//         numberOfIds[numberOfIds.length - 1] -= 1;
//       } else {
//         if (numberOfIds.length > 0) {
//           totalUniqueIds -= 1;
//           numberOfIds.pop();
//           i -= 1;
//         }
//       }
//     }
//   }

//   let idx = -1;
//   console.log(result.reduce((sum, num) => {
//     idx += 1;
//     return sum + (idx * num);
//   }, 0));
// });