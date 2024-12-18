let fs =  require('fs');

function splitStone(numStr) {
  let halfwayIdx = (numStr.length / 2);

  let str1 = '';
  let str2 = '';
  
  let bool = false;
  for (let idx = 0; idx < halfwayIdx; idx += 1) {
    let char = numStr[idx];

    if (char !== '0') {
      bool = true;
      str1 += char;
    } else if (bool) {
      str1 += char;
    }
  }

  bool = false;
  for (let idx = halfwayIdx; idx < numStr.length; idx += 1) {
    let char = numStr[idx];
    if (char !== '0') {
      bool = true;
      str2 += char;
    } else if (bool) {
      str2 += char;
    }
  }

  return [str1 ? str1 : '0', str2 ? str2 : '0'];
}

fs.readFile('input11.txt', 'utf-8', function(err, data) {
  let blinks = 75;
  let stones = data.split(' ');
  let memo;
  let total = 0;

  while (blinks > -1) {
    blinks -= 1;
    console.log(blinks);
    memo = {};
    stones.forEach(stone => {
      if (Array.isArray(stone)) {
        if (!memo[stone[0]]) {
          memo[stone[0]] = 0;
        }

        memo[stone[0]] += stone[1];
      } else {
        if (!memo[stone]) {
          memo[stone] = 0;
        }
  
        memo[stone] += 1;
      }
    });
    
    stones = [];
    Object.keys(memo).forEach(stone => {
      let newNum;
      if (stone === '0') {
        newNum = '1';
        stones.push([newNum, memo[stone]]);
      } else if (stone.length % 2 !== 0) {
        newNum = String(Number(stone) * 2024);
        stones.push([newNum, memo[stone]]);
      } else {
        newNum = splitStone(stone);
        newNum = newNum.map(num => [num, memo[stone]])
        stones.push(...newNum);
      }
    });
  }

  Object.keys(memo).forEach(stone => {
    total += memo[stone];
  });

  // if (!memo[stone]) {
  //   if (stone.length % 2 !== 0) {
  //     let newNum = Number(stone) * 2024;
  //     memo[stone] = String(newNum);
  //   } else {
  //     memo[stone] = splitStone(stone);
  //   }
  // }

  // if (Array.isArray(memo[stone])) {
  //   newArr.push(...memo[stone]);
  // } else {
  //   newArr.push(memo[stone]);
  // }




  // while (blinks > 0) {
  //   blinks -= 1;
  //   console.log(blinks)
    
  //   let newArr = [];
  //   for (let idx = 0; idx < stones.length; idx += 1) {
  //     let stone = stones[idx];

  //     if (!memo[stone]) {
  //       if (stone.length % 2 !== 0) {
  //         let newNum = Number(stone) * 2024
  //         memo[stone] = String(newNum);
  //       } else {
  //         memo[stone] = splitStone(stone);
  //       }
  //     }

  //     if (Array.isArray(memo[stone])) {
  //       newArr.push(...memo[stone]);
  //     } else {
  //       newArr.push(memo[stone]);
  //     }
  //   }

  //   stones = newArr;
  // }

  console.log(total);
});