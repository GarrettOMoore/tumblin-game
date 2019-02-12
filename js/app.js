// declaring canvas variables

var canvas = document.querySelector('canvas');
var innerWidth = window.innerWidth/2;
var innerHeight = 620;
canvas.width = innerWidth;
canvas.height = innerHeight;
var ctx = canvas.getContext('2d');

//audio variables
var lvlOneMusic = new sound("/Users/garrettmoore/Code/Unit1/tumblin-game/sounds/gone_fishin_by_memoraphile_CC0.mp3");
var lvlTwoMusic = new sound("/Users/garrettmoore/Code/Unit1/tumblin-game/sounds/beary_fishy_menu_screen_by_memoraphile_CC0.mp3");
var lvlThreeMusic = new sound("/Users/garrettmoore/Code/Unit1/tumblin-game/sounds/Farewell_To_Nova_Scotia_Popular_Folk_Song_Akkordica_Anglo-German_Concertina_VST_Plugin.mp3");
var laser = new sound("/Users/garrettmoore/Code/Unit1/tumblin-game/sounds/laser1.wav");
var playerHit = new sound('/Users/garrettmoore/Code/Unit1/tumblin-game/sounds/swish_3.wav');
var gameOverSound = new sound('/Users/garrettmoore/Code/Unit1/tumblin-game/sounds/GameOver.wav');
var winMusic = new sound('/Users/garrettmoore/Code/Unit1/tumblin-game/sounds/win music 2.wav');

// timer variables

var timeHandler = null;
var seconds = 3;
var enemyInterval = null;
var enemyIntervalTwo = null;
var enemyBulletInterval = null;

// var to hold current background location
var currentBackground;

// dom score and life count variables 

var headerText = document.getElementById('header');
var scoreBox = document.getElementById('score-num');
var lifeCount = document.getElementById('lives-num');
var restart = document.getElementById('button');
var lives = 3;
var score = 0;

// game states
var levelOne = true;
var levelTwo = false;
var levelThree = false;

// player movement
var minY = ((innerWidth/2) - 30);
var maxY = ((innerWidth/2) + 30);
var pace = 5;

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
var bossCount = 0;
var boss = [];
var maxEnemies = 5;

// set interval to create level one enemies

enemyInterval = setInterval(function(){
  var scorpion = new Entity (player.x + 1000, (innerWidth/2) + 20, 100, 100, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/Scorpion.png');
  var cowboy = new Entity (player.x + 600, (innerWidth/2) - 10, 100, 100,'/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/Cowboy4_walk with gun_3.png');
  if (enemies.length < maxEnemies) {
  enemies.push(cowboy, scorpion);
  }  
}, 5000);

// clear enemy function
var clearEnemies = function() {
  for(let i = 0; i < enemies.length; i++) {
    enemies.pop();
  }
}

// create handler for audio files
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

// background image objects & template

function changeBackground(x, y, width, height, src) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.src = src;
}

changeBackground.prototype.draw = function() {
  var backImg = new Image();
  backImg.src = this.src;
  ctx.drawImage(backImg, this.x, this.y, this.width, this.height);
};

var bgOne = new changeBackground(0, 0, 3960, 620, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/desert_BG.png');
var bgTwo = new changeBackground(0, 0, 3960, 620, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/swamp.png');
var bgThree = new changeBackground(0, 0, 3960, 620, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/country field.png');

// draw on player character
var playerWidth = 100;
var playerHeight = 100;
var playerImg = new Image();
  playerImg.src = '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/newtw.png';

var playerImgArray = ['/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/newtw.png', '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/newtw2.png',
  '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/newtw3.png', '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/newtw4.png'];


var player = {
  x: innerWidth/12 - (playerWidth/2),
  y: innerHeight - (playerHeight+80),
  width: 250,
  height: 250,
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
  39: false, // right arrow - move forward
  70: false, // f key - shoot
  83: false, // s key - jump
}

// shooting mechanics

var bullets = [];
var enemyBullets = [];

function newBullet(x, y, width, height, src) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.src = src;
}

newBullet.prototype.draw = function (){
  var bulletImg = new Image();
  bulletImg.src = this.src;
  ctx.drawImage(bulletImg, this.x, this.y, this.width, this.height);
}

// level two enemies
var fox = new Entity (player.x + 500, (innerWidth/2) + 20, 100, 100, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/002.png');

function initGame() {
document.addEventListener('keydown', function(event){
if (event.keyCode in map) {
  map[event.keyCode] = true;
  if (map[39]) {
    if (currentBackground === bgOne || currentBackground === bgTwo) {
      currentBackground.x -= pace;
    }
    player.x += 1;
    for(let i = 0; i < playerImgArray; i++) {
      playerImg = new Image();
      playerImg.src = playerImgArray[i];
    }

} else if (map[70]) {
    var bullet = new newBullet(player.x + 75, player.y + 75, 100, 100,'/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/newtw.png');
    bullets.push(bullet);
    if (bullets.length >= 3) {
      bullets.length = 0;
    }
  } 
}});

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
  } else {
    initGame();
    headerText.textContent = "TUMBLE!";
    lvlOneMusic.play();
    setTimeout(function(){
      headerText.textContent = "LEVEL 1";
    }, 3000)
    clearInterval(timeHandler);
    }
  }, 1000)
});

// run animation function / add characters to canvas

var animate = function () {
  scoreBox.textContent = score;
  lifeCount.textContent = lives;
  if (lives > 0) {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  currentBackground.draw();
  // LEVEL TWO STARTS
  if(player.x >= 600){
    levelTwo = true;
    lvlOneMusic.stop();
    lvlTwoMusic.play();
    clearEnemies();
    clearInterval(enemyInterval);
    enemies.forEach(function(enemy, i){
      enemy.x + 300;
      enemy.draw();
      enemy.x -= i;
  })
    enemyIntervalTwo = setInterval(function(){
    var cobra = new Entity (player.x + 500, (innerWidth/2) + 20, 100, 100, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/attack1.png');
    var fox = new Entity (player.x + 650, (innerWidth/2) + 20, 100, 100, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/002.png');
    if (enemies.length < maxEnemies) {
      enemies.push(fox);
      enemies.push(cobra);
  } setInterval(function() {
      enemies.y -= 60;
    },1000)
    setTimeout(function() {
      enemies.y += 60
    }, 200);
}, 5000);
    enemies.length = 0;
    currentBackground = bgTwo;
    player.x = 0;
    headerText.textContent = "LEVEL 2";
  }
  player.draw();
  enemies.forEach(function(cowboy, i){
    cowboy.x + 300;
    cowboy.draw();
    cowboy.x -= i / 4;
  // LEVEL THREE STARTS
}); if (currentBackground === bgTwo && player.x >= 580) {
      levelThree = true;
      clearEnemies();
      headerText.textContent = "LAST LEVEL";
      currentBackground = bgThree;
      player.x = 0;
      lvlTwoMusic.stop();
      lvlThreeMusic.play();
      clearInterval(enemyIntervalTwo);
      enemies.forEach(function(enemy, i){
        enemy.draw();
      });
      var boss = new Entity (player.x + 500, (innerWidth/2) - 15, 150, 150, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/jump-1.png');
      enemies.push(boss);
      enemies[0].x - 2;
    }} if (!levelOne && !levelTwo && levelThree && enemies.length === 0) {
      lvlThreeMusic.stop();
      winMusic.play();
      headerText.textContent = "YOU WIN!";
    }
  
  bullets.forEach(function(bullet){
    bullet.draw();
    bullet.x += pace * 2;
  });

// add collision detection
  for(let i = 0; i < enemies.length; i++) {
    enemies[i].x -= 2;
  if(player.x - 100 < enemies[i].x + enemies[i].width && (player.x - 100) + player.width > enemies[i].x &&
      player.y < enemies[i].y + enemies[i].height && player.y + enemies[i].height > enemies[i].y){
      playerHit.play();
      player.x -= 30;
      enemies[i].x += 300;
      lives--;

  
} for(let i = 0; i < bullets.length; i++) {
  if (bullets[i].x < enemies[i].x + (enemies[i].width - 30) && bullets[i].x + (enemies[i].width - 30) > enemies[i].x &&
      bullets[i].y < enemies[i].y + enemies[i].height && bullets[i].y + enemies[i].height > enemies[i].y) {
      score += 10;
      bullets.splice([i],1);
      laser.play();
      enemies[i].src = '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/boom2.png';
      enemies[i].x += 80;
      enemies[i].y -= 10;
      setTimeout(function(){
        enemies.splice([i],1);
      }, 500)
    }
}} if (lives === 0) {
  lvlOneMusic.stop();
  lvlTwoMusic.stop();
  lvlThreeMusic.stop();
  gameOverSound.play();
  headerText.textContent = "GAME OVER";
}};

// restart function
var restartGame = function () {
  lvlOneMusic.stop();
  lvlTwoMusic.stop();
  lvlThreeMusic.stop();
  currentBackground = bgOne;
  seconds = 3;
  currentBackground.x = 0;
  lives = 3;
  score = 0;
  enemies.length = 0;
  player.x = 0;
  timeHandler = setInterval(function(){
    if (seconds > 0) {
      headerText.textContent = seconds;
      seconds--;
    } else {
      initGame();
      headerText.textContent = "TUMBLE!";
      lvlOneMusic.play();
      setTimeout(function(){
        headerText.textContent = "LEVEL 1";
      }, 3000)
      clearInterval(timeHandler);
      }
    }, 1000)
  clearInterval(enemyInterval && enemyIntervalTwo);
  animate();
}

restart.addEventListener('click', restartGame);
animate();
