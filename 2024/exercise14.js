let fs = require('fs');

function formatRobots(allData) {
  return allData.split('\r\n').map(str => {
    let[position, velocity] = str.split(' ');
    let [posX, posY] = position.split('=')[1].replace(',', ' ').split(' ').map(Number);
    let [velX, velY] = velocity.split('=')[1].replace(',', ' ').split(' ').map(Number);

    return {'position': {x: posX, y: posY}, 'velocity': {x: velX, y: velY}};
  });
}

function checkAround(robot, comparableRobot) {
  return (
    robot.x + 1 === comparableRobot.x && robot.y === comparableRobot.y ||
    robot.x - 1 === comparableRobot.x && robot.y === comparableRobot.y ||
    robot.x === comparableRobot.x && robot.y + 1 === comparableRobot.y ||
    robot.x === comparableRobot.x && robot.y - 1 === comparableRobot.y ||
    robot.x + 1 === comparableRobot.x && robot.y + 1 === comparableRobot.y ||
    robot.x - 1 === comparableRobot.x && robot.y + 1 === comparableRobot.y ||
    robot.x + 1 === comparableRobot.x && robot.y - 1 === comparableRobot.y ||
    robot.x - 1 === comparableRobot.x && robot.y - 1 === comparableRobot.y 
  )
}

function possibleEasterEgg(robots, max, roomDim) {
  let adjacentRobots = 0;
  for (let idx = 0; idx < robots.length; idx += 1) {
    let adjacentRobots = 0;
    let robot = robots[idx];
    
    robots.forEach(comparableRobot => {
      if (checkAround(robot.position, comparableRobot.position)) {
        adjacentRobots += 1;
      }
    }
  }

  if (adjacentRobots >= max) {
    max = adjacentRobots;
    fs.writeFile(`output14.txt`, drawRobots(robots, roomDim), function () {});
  }

  return max;
}

function drawRobots(robots, roomDim) {
  let table = [];
  for (let rowIdx = 0; rowIdx < roomDim.tall; rowIdx += 1) {
    table[rowIdx] = [];
    
    for (let colIdx = 0; colIdx < roomDim.wide; colIdx += 1) {
      table[rowIdx][colIdx] = '.';
    }
  }

  robots.forEach(robot => {
    let [positionX, positionY] = [robot.position.x, robot.position.y];
    table[positionY][positionX] = '#';
  });

  return table.map(row => row.join('')).join('\r\n');
}


fs.readFile('input14.txt', 'utf-8', (error, data) => {
  let robots = formatRobots(data);
  let roomDim = {'wide': 101, 'tall': 103};
  let time = 0;
  let max = 0;

  while (time < 10000) {
    max = possibleEasterEgg(robots, max, roomDim);

    robots.forEach(robot => {
      let newPosX = (robot.velocity.x + robot.position.x) % roomDim.wide;
      let newPosY = (robot.velocity.y + robot.position.y) % roomDim.tall;
      newPosX = newPosX < 0 ? (roomDim.wide + newPosX) : newPosX;
      newPosY = newPosY < 0 ? (roomDim.tall + newPosY) : newPosY;
      
      robot.position.x = newPosX;
      robot.position.y = newPosY;
    });

    time += 1;
  }


  console.log(time);
});




// let fs = require('fs');

// function formatRobots(allData) {
//   return allData.split('\r\n').map(str => {
//     let[position, velocity] = str.split(' ');
//     let [posX, posY] = position.split('=')[1].replace(',', ' ').split(' ').map(Number);
//     let [velX, velY] = velocity.split('=')[1].replace(',', ' ').split(' ').map(Number);

//     return {'position': {x: posX, y: posY}, 'velocity': {x: velX, y: velY}};
//   });
// }

// function determineRobotsInEachQuadrant(roomDim, robots) {
//   let boundingIncludingX;
//   let boundingIncludingY;
//   let result = [];

//   for (let quadrant = 1; quadrant <= 4; quadrant += 1) {
//     switch(quadrant) {
//       case 1:
//         boundingIncludingX = Math.floor(roomDim.wide / 2) - 1;
//         boundingIncludingY = Math.floor(roomDim.tall / 2) - 1;
//         result.push(robots.filter(robot => robot.position.x <= boundingIncludingX && robot.position.y <= boundingIncludingY).length);
//         break;
//       case 2:
//         boundingIncludingX = Math.ceil(roomDim.wide / 2);
//         boundingIncludingY = Math.floor(roomDim.tall / 2) - 1;
//         result.push(robots.filter(robot => robot.position.x >= boundingIncludingX && robot.position.y <= boundingIncludingY).length);
//         break;
//       case 3:
//         boundingIncludingX = Math.floor(roomDim.wide / 2) - 1;
//         boundingIncludingY = Math.ceil(roomDim.tall / 2);
//         result.push(robots.filter(robot => robot.position.x <= boundingIncludingX && robot.position.y >= boundingIncludingY).length);
//         break;
//       case 4:
//         boundingIncludingX = Math.ceil(roomDim.wide / 2);
//         boundingIncludingY = Math.ceil(roomDim.tall / 2);
//         result.push(robots.filter(robot => robot.position.x >= boundingIncludingX && robot.position.y >= boundingIncludingY).length);
//     }
//   }

//   return result;
// }


// fs.readFile('input14.txt', 'utf-8', (error, data) => {
//   let robots = formatRobots(data);
//   let roomDim = {'wide': 101, 'tall': 103};
//   let TIME = 100;
  
//   robots.forEach(robot => {
//     let traveledXDistance = robot.velocity.x * TIME;
//     let traveledYDistance = robot.velocity.y * TIME;
//     let newPosX = (traveledXDistance + robot.position.x) % roomDim.wide;
//     let newPosY = (traveledYDistance + robot.position.y) % roomDim.tall;
//     newPosX = newPosX < 0 ? (roomDim.wide + newPosX) : newPosX;
//     newPosY = newPosY < 0 ? (roomDim.tall + newPosY) : newPosY;
    
//     robot.position.x = newPosX;
//     robot.position.y = newPosY;
//   });

//   let results = determineRobotsInEachQuadrant(roomDim, robots);

//   console.log(results.reduce((prod, num) => prod * num, 1));
// });