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

function recurse(stone, blink = 75, memo = {}) {
  if (blink === 0) {
    return 1;
  } else if (memo[str]) {
    return memo[str];
  } else {
    if (str.length % 2 !== 0) {
      let newNum = Number(str) * 2024;
      memo[str] = String(newNum);
    } else {
      memo[str] = splitStone(stone);
    }

    if (Array.isArray(memo[stone])) {
      for (let i = 0; i < memo[stone].length; i += 1) {
        return recurse(memo[str][i], blink + 1, memo);
      }
    } else {
      return recurse(memo[str], blink + 1, memo);
    }
  }
}

fs.readFile('input11.txt', 'utf-8', function(err, data) {
  let blinks = 75;
  let stones = data.split(' ');
  let memo = {'0': '1'};
  let total = 0;

  while (stones.length > 0) {
    let newArr = [stones.shift()];
    for (let blink = 0; blink < blinks; blink += 1) {
      console.log(stones.length, blink)
      let length = newArr.length
      for (let idx = 0; idx < length; idx += 1) {
        let stone = newArr.shift();
        
        if (!memo[stone]) {
          if (stone.length % 2 !== 0) {
            let newNum = Number(stone) * 2024;
            memo[stone] = String(newNum);
          } else {
            memo[stone] = splitStone(stone);
          }
        }
  
        if (Array.isArray(memo[stone])) {
          newArr.push(...memo[stone]);
        } else {
          newArr.push(memo[stone]);
        }
      }
    }

    total += newArr.length;
  }
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