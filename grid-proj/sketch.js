//make a kind of maze game, hardcode a maze
//Make a mini game thingy
// use windowResized(windowHeight)

let screen = true;
let gridChangeOne;
let gridChangeTwo;
let gridOne =[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const GRID_SIZE = 10;
let cellSize;
const OPEN_TILE = 0;
const IMPASSIBLE_TILE = 1;
const PLAYER_TILE = 2;
const FALLING_TILE = 3;
let player = {
  x: 5,
  y: 5,
};
let enemy = {
  x: 0,
  y: 0,
};
let click = false;
let clickTwo;
let timer = 500; // going to do it in millis
let tickRate = 50;
let lost = false;

function setup() {
  if (windowWidth < windowHeight){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function draw() {
  background(220);
  if (click === true){
    gridOne[player.y][player.x] = PLAYER_TILE;
    gridOne[enemy.y][enemy.x] = FALLING_TILE;
    displayGridOne();
    autoMoveEnemy();
    gridChangeOne = true;
    fill("black");
    textSize(30);
    text(frameCount, 800, 100);
  }
  else if (click === false){
    text("hello", width/2, height/2);
  }
}


function keyPressed(){
  if (click === true){
    if (key === "w"){
      movePlayer(player.x, player.y - 1);
    }
  
    if (key === "a"){
      movePlayer(player.x - 1, player.y);
    }
  
    if (key === "s"){
      movePlayer(player.x, player.y + 1);
    }
  
    if (key === "d"){
      movePlayer(player.x + 1, player.y);
    }
  }
}

function autoMoveEnemy() {
  if (player.x === enemy.x && player.y === enemy.y + 1){
    background(220);
    fill("black");
    text("you lose, press F5 to restart", width/2, height/2);
    quit();
  }
  if (frameCount % tickRate === 0){
    if (enemy.y >= 9){
      tickRate -= 5;
      gridOne[enemy.y][enemy.x] = OPEN_TILE;
      enemy.y = 0;
      enemy.x = round(random(0, 9));
      enemyMove(enemy.x, enemy.y);
    }
    else if (enemy.y <= 8){
      enemyMove(enemy.x, enemy.y + 1);
    }
  }
  if (tickRate === 0) {
    if (enemy.y >= 9){
      gridOne[enemy.y][enemy.x] = OPEN_TILE;
      enemy.y = 0;
      enemy.x = round(random(0, 9));
      enemyMove(enemy.x, enemy.y);
    }
    else if (enemy.y <= 8){
      enemyMove(enemy.x, enemy.y + 1);
    }
  }
}


function mouseClicked(){
  if (click === false){
    click = true;
  }
}

function enemyMove(x, y){
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && gridOne[y][x] === OPEN_TILE){
    gridOne[enemy.y][enemy.x] = OPEN_TILE;

    // keep track of enemy location
    enemy.x = x;
    enemy.y = y;

    // put enemy in the grid
    gridOne[enemy.y][enemy.x] = FALLING_TILE;
    gridOne[player.y][player.x] = PLAYER_TILE;
  }
}

function displayGridOne(){
  if (gridChangeOne === true){
    //Objects/Players
    for (let y = 0; y < GRID_SIZE; y++){
      for (let x = 0; x < GRID_SIZE; x++){
        if (gridOne[y][x] === IMPASSIBLE_TILE) {
          fill("black");
          square(x * cellSize, y * cellSize, cellSize);
        }
        else if(gridOne[y][x] === OPEN_TILE){
          fill("white");
          square(x * cellSize, y * cellSize, cellSize);
        }
        else if(gridOne[y][x] === PLAYER_TILE){
          fill("red");
          square(x * cellSize, y * cellSize, cellSize);
        }
        else if(gridOne[y][x] === FALLING_TILE){
          fill("blue");
          square(x * cellSize, y * cellSize, cellSize);
        }
        else if(grid[y][x] === HIT_TILE){
          fill("yellow");
          square(x * cellSize, y * cellSize, cellSize);
        }
      }
    }
  }
}

function movePlayer(x, y){
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && gridOne[y][x] === OPEN_TILE){
    //when moving reset to an open spot
    gridOne[player.y][player.x] = OPEN_TILE;

    // keep track of player location
    player.x = x;
    player.y = y;

    // put player in the grid
    gridOne[player.y][player.x] = PLAYER_TILE;
  }
}
