// declaring canvas variables

var canvas = document.querySelector('canvas');
var innerWidth = window.innerWidth/2;
var innerHeight = 620;
canvas.width = innerWidth;
canvas.height = innerHeight;
var ctx = canvas.getContext('2d');

//timer variables

var timeHandler = null;
var seconds = 3;
var enemyInterval = null;
var enemyIntervalTwo = null;
var enemyIntervalThree = null;

//var to hold current background location
var currentBackground;

// dom score and life count variables 

var headerText = document.getElementById('header');
var scoreBox = document.getElementById('score-num');
var lifeCount = document.getElementById('lives-num');
var lives = 3;

//game states
var levelOne = true;
var levelTwo = false;
var levelThree = false;
// template for enemy characters

function Entity(x, y, width, height, src) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.src = src;
};

Entity.prototype.draw = function() {
    var spriteImg = new Image();
    spriteImg.src = this.src
    ctx.drawImage(spriteImg, this.x, this.y, this.width, this.height);
}

// enemy characters
var enemies = [];


// set interval to create level one enemies

enemyInterval = setInterval(function(){
    var scorpion = new Entity (player.x + 600, (innerWidth/2) + 10, 100, 100, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/Scorpion.png');
    var cowboy = new Entity (player.x + 800, (innerWidth/2) - 5, 100, 100,'/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/Cowboy4_walk with gun_3.png');
    enemies.push(cowboy, scorpion);
    enemies.shift();
}, 4000);


// clear enemy function
var clearEnemies = function() {
    for(let i = 0; i < enemies.length; i++) {
        enemies.pop();
        console.log(enemies);
    }
}

// background image objects & template

function newBackground(x, y, width, height, src) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.src = src;
}

newBackground.prototype.draw = function() {
    var backImg = new Image();
    backImg.src = this.src;
    ctx.drawImage(backImg, this.x, this.y, this.width, this.height);
};

var bgOne = new newBackground(0, 0, 3960, 620, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/desert_BG.png');
var bgTwo = new newBackground(0, 0, 3960, 620, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/swamp.png');
var bgThree = new newBackground(0, 0, 3960, 620, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/country field.png');

// draw on player character
var playerWidth = 100;
var playerHeight = 100;
var playerImg = new Image();
    playerImg.src = '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/tumbleweed2.png';


var player = {
  x: innerWidth/12 - (playerWidth/2),
  y: innerHeight - (playerHeight+80),
  width: 100,
  height: 100,
  draw: function() {
    if (this.x <= 0) {
        this.x = 0;
  } else if (this.y >= (innerHeight - this.height)) {
      this.y = (innerHeight - this.height);
    } 
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  }
}

// dom/key movement object & event listeners
var map = {
    37: false, // Left Arrow
    39: false, // Right Arrow
    83: false, // S key
}

//level two enemies
var fox = new Entity (player.x + 500, (innerWidth/2) + 20, 100, 100, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/002.png');

function initGame() {
document.addEventListener('keydown', function(event){
  if (event.keyCode in map) {
    map[event.keyCode] = true;
      if (map[39]) {
        currentBackground.x -= 5;
        player.x += 1;
        console.log(player.x);
    } else if (map[37]) {
        player.x -= 1;
        }}
    });

document.addEventListener('keyup', function(event){
  if(event.keyCode in map) {
    map[event.keyCode] = false;
}})
  currentBackground = bgOne;
};

// set timer & lock keys until countdown finished

document.addEventListener("DOMContentLoaded", function(){
    currentBackground = bgOne;    

 timeHandler = setInterval(function(){
  if (seconds > 0) {
    headerText.textContent = seconds;
    seconds--;
  } else if (lives === 0) {
    headerText.textContent = "GAME OVER";
  } else {
    initGame();
    headerText.textContent = "TUMBLE!";
    setTimeout(function(){
      headerText.textContent = "LVL 1";
    }, 3000)
    clearInterval(timeHandler);
    }
  }, 1000)
});

// run animation function / add characters to canvas

var animate = function () {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  currentBackground.draw();
  if(player.x >= 630 && lives > 0){
    clearEnemies();
    clearInterval(enemyInterval);
    enemies.forEach(function(enemy, i){
      enemy.x + 300;
      enemy.draw();
      enemy.x -= i / 4;
  })
    enemyIntervalTwo = setInterval(function(){
    var cobra = new Entity (player.x + 400, (innerWidth/2) + 20, 100, 100, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/attack1.png');
    var fox = new Entity (player.x + 500, (innerWidth/2) + 20, 100, 100, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/002.png');
    enemies.push(fox);
    enemies.push(cobra);
   }, 2500);
    headerText.textContent = "LVL 2";
    player.x = 0;
    currentBackground = bgTwo;
  }
  player.draw();
  enemies.forEach(function(cowboy, i){
    cowboy.x + 300;
    cowboy.draw();
    cowboy.x -= i / 4;
  }); if (currentBackground === bgTwo && player.x >= 580) {
      clearEnemies();
      clearInterval(enemyIntervalTwo);
      enemies.forEach(function(enemy, i){
        enemy.x + 300;
        enemy.draw();
      })
      var boss = new Entity (player.x + 700, (innerWidth/2) + 100, 100, -250, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/Timonkey.png');
      enemies.push(boss);
      currentBackground = bgThree;
      player.x = 0;
      headerText.textContent = "FINAL LVL";
  }
    if (enemies.length > 20) {
      for (let i = 0; i < enemies.length; i++) {
        enemies.pop();
      }
  }
};

animate()



