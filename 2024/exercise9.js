let fs = require('fs')

function isEmptyIdx(idx) {
  return idx % 2 !== 0;
}

function formatNumberOfIdsAndNumberOfDots(str) {
  let numberOfIds = [];
  let numberOfSpaces = [];
  for (let idx = 0; idx < str.length; idx += 1) {
    if (!isEmptyIdx(idx)) {
      numberOfIds.push(Number(str[idx]));
    } else {
      numberOfSpaces.push(Number(str[idx]));
    }
  }

  return [numberOfIds, numberOfSpaces];
}

function popFileUntilDot(files, dotFreq) {
  let file;
  while (files.length > 0) {
    file = files.pop();
    if (file.result.length <= dotFreq) {
      return file;
    }
  }

  return undefined;
}

function findMaxDotLength(hshList) {
  let max = 0;
  hshList.forEach(hsh => {
    if (countDots(hsh.result) > max) {
      max = countDots(hsh.result);
    }
  });

  return max;
}

function countDots(str) {
  let result = 0;

  for (let idx = 0; idx < str.length; idx += 1) {
    if (str[idx] === '.') {
      result += 1;
    }
  }

  return result;
}

fs.readFile('input9.txt', 'utf-8', function(err, data) {
  let [numberOfIds, numberOfSpaces] = formatNumberOfIdsAndNumberOfDots(data);
  // let totalUniqueIds = numberOfIds.length - 1;

  let result = '';

  let files = [];
  let idx = -1;
  // Create a list of file hashes
  numberOfIds.forEach(num => {
    idx += 1;
    let resultant = '';
    for (let i = 0; i < num; i += 1) {
      resultant += String(idx);
    }

    files.push({id: idx, result: resultant});
  });

  let dots = [];

  // Create a list of dots
  for (let i = 0; i < numberOfSpaces.length; i += 1) {
    let spaceFreq = numberOfSpaces[i];
    let resultant = '';
    for (let _ = 0; _ < spaceFreq; _ += 1) {
      resultant += '.';
    }

    dots.push({result: resultant});
  }

  for (let idx = 0; idx < files.length; idx += 1) {
    files[idx].startIdx = result.length;
    result += files[idx].result 
    if (dots[idx]) {
      dots[idx].startIdx = result.length;
      result += dots[idx].result;
    }
  }

  result = result.split('');
  let file = files.pop();

  while (file) {
    let maxDotFreq = findMaxDotLength(dots);
    console.log(maxDotFreq);
    if (file.result.length > maxDotFreq) {
      file = popFileUntilDot(files, maxDotFreq);
    }
    console.log(file);

    if (file) {
      let currentIdx = file.startIdx;
      dots = dots.filter(hsh => hsh.startIdx < currentIdx);
      for (let idx = 0; idx < dots.length; idx += 1) {
        let hsh = dots[idx];
        if (file.result.length <= countDots(hsh.result)) {
          let resultant = ''
          for (let i = 0; i < file.result.length; i += 1) {
            resultant += '.';
            result[file.startIdx + i] = '.';
            result[hsh.startIdx + i] = String(file.id);
          }



          let newDotResult = hsh.result.slice(file.result.length);
          let newStartIdx = hsh.startIdx + file.result.length;

          if (newDotResult.length > 0) {
            dots.push({result: newDotResult, startIdx: newStartIdx});
          }



          let newDot = {result: resultant, startIdx: file.startIdx}
          dots.push(newDot);

          idx = dots.length;
        }
      }

      dots.sort((hshA, hshB) => hshA.startIdx - hshB.startIdx);
    }

    file.result = '';
  }

  idx = -1;
  console.log(result.reduce((sum, num) => {
    idx += 1;
    if ((num === '.')) {
      return sum  
    } else {
      return sum + (idx * num);
    }
  }, 0));
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