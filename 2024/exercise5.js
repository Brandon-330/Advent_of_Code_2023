let fs = require('fs');

function splitRows(str) {
  return str.split('\r\n')
}

function functionFormatPageNumbersPerUpdate(str) {
  return splitRows(str).map(row => row.split(','));
}

function permutations(arr, ruleBook, result = []) {
  if (arr.length === 0) {
    return Number(result[Math.floor(result.length / 2)]);
  }
  
  for (let idx = 0; idx < arr.length; idx += 1) {
    let el = arr[idx];
    let otherNums = arr.slice(0, idx).concat(arr.slice(idx + 1));
    if (otherNums.every(num => !(ruleBook[el] || []).includes(num))) {
      let filteredRuleBook = {};
      let filteredKeys = Object.keys(ruleBook).filter(key => key !== el);
      filteredKeys.forEach(k => filteredRuleBook[k] = ruleBook[k]);
      console.log(result);
      return permutations(otherNums, filteredRuleBook, [el].concat(result));
    }
  }
}

function produceRuleBook(arr) {
  // Format rows first
  arr = splitRows(arr);
  let afterToBeforeRuleBook = {};
  arr.forEach(rule => {
    let [before, after] = rule.split('|');
    if (afterToBeforeRuleBook[after]) {
      afterToBeforeRuleBook[after].push(before);
    } else {
      afterToBeforeRuleBook[after] = [before];
    }
  })

  return afterToBeforeRuleBook;
}

fs.readFile('input5.txt', 'utf-8', function(err, data) {
  let [pageOrderingRules, pageNumbersPerUpdate] = data.split('\r\n\r\n');
  let ruleBook = produceRuleBook(pageOrderingRules);
  pageNumbersPerUpdate = functionFormatPageNumbersPerUpdate(pageNumbersPerUpdate);

  let incorrectlyOrdered = pageNumbersPerUpdate.filter(row => {
    let pastNums = [];
    for (let idx = row.length - 1; idx >= 0; idx -= 1) {
      let num = row[idx];
      if (pastNums.some(iteratingNum => (ruleBook[num] || []).includes(iteratingNum))) {
        return true;
      }

      pastNums.push(num);
    }

    return false;
  });

  let middleNums = incorrectlyOrdered.map(order => {
    let rulesOfInterest = {};
    Object.keys(ruleBook).forEach(key => {
      if (order.includes(key)) {
        rulesOfInterest[key] = ruleBook[key];
      }
    });

    console.log(rulesOfInterest);
    return permutations(order, rulesOfInterest);
  });

  let result = middleNums.reduce((sum, num) => sum + num, 0);

  console.log(result);
});



// let fs = require('fs');

// function splitRows(str) {
//   return str.split('\r\n')
// }

// function functionFormatPageNumbersPerUpdate(str) {
//   return splitRows(str).map(row => row.split(','));
// }

// function produceRuleBook(arr) {
//   // Format rows first
//   arr = splitRows(arr);
//   let afterToBeforeRuleBook = {};
//   arr.forEach(rule => {
//     let [before, after] = rule.split('|');
//     if (afterToBeforeRuleBook[after]) {
//       afterToBeforeRuleBook[after].push(before);
//     } else {
//       afterToBeforeRuleBook[after] = [before];
//     }
//   })

//   return afterToBeforeRuleBook;
// }

// fs.readFile('input5.txt', 'utf-8', function(err, data) {
//   let [pageOrderingRules, pageNumbersPerUpdate] = data.split('\r\n\r\n');
//   let ruleBook = produceRuleBook(pageOrderingRules);
//   pageNumbersPerUpdate = functionFormatPageNumbersPerUpdate(pageNumbersPerUpdate);

//   console.log(ruleBook);


//   let filteredResult = pageNumbersPerUpdate.filter(row => {
//     let pastNums = [];
//     for (let idx = row.length - 1; idx >= 0; idx -= 1) {
//       let num = row[idx];
//       if (pastNums.some(iteratingNum => (ruleBook[num] || []).includes(iteratingNum))) {
//         return false;
//       }

//       pastNums.push(num);
//     }

//     return true;
//   });

//   let result = filteredResult.map(correctOrders => {
//     return Number(correctOrders[Math.floor(correctOrders.length / 2)]) 
//   }).reduce((sum, num) => sum + num, 0);

//   console.log(result);
// });