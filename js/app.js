console.log("Hello world");

// declaring canvas variables

var canvas = document.querySelector('canvas');
var innerWidth = window.innerWidth/2;
var innerHeight = 620;
canvas.width = innerWidth;
canvas.height = innerHeight;
var ctx = canvas.getContext('2d');
var headerText = document.getElementById('header');

//timer variables

var timeHandler = null;
var seconds = 3;
var enemyInterval = null;

// dom score and life count variables 

var scoreBox = document.getElementById('score-num');
var lifeCount = document.getElementById('lives-num');
var lives = 3;

// shooter variables and function
var sticks = [];
var isShooting = false;
var shoot = function(event){
    if (event) {
        let key = event.keyCode;
        if (key === 83) {
            isShooting = true;
            sticks.push({
                x: player.x,
                y: player.y + (player.height /2),
            });
        } 
    }
}

// bullet object

var stick = {
    width: 100,
    height: 100,
    x: playerWidth/2,
    y: playerHeight/2,
    img: new Image(),
    src: '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/bullet.png',
};

// background image objects

var backgroundOne = {
    width: 3960,
    height: 620,
    x: 0,
    y: 0,
    src: '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/desert_BG.png',
    draw: function() {
      let bg = new Image();
      bg.src = this.src;
      ctx.drawImage(bg, this.x, this.y, this.width, this.height);
    }
};

var backgroundTwo = {
    width: 3960,
    height: 620,
    x: 0,
    y: 0,
    src: '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/swamp.png',
    draw: function() {
      let bg = new Image();
      bg.src = this.src;
      ctx.drawImage(bg, this.x, this.y, this.width, this.height);
    }
}

var backgroundThree = {
    width: 3960,
    height: 620,
    x: 0,
    y: 0,
    src: '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/country field.png',
    draw: function() {
        let bg = new Image();
        bg.src = this.src;
        ctx.drawImage(bg, this.x, this.y, this.width, this.height);
    }
}

// player character object

var player = {},
playerWidth = 100,
playerHeight = 100,
playerImg = new Image();
playerImg.src = '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/tumbleweed2.png';

// draw on player character

var player = {
  width: playerWidth,
  height: playerHeight,
  x: innerWidth/12 - (playerWidth/2),
  y: innerHeight - (playerHeight+80),
  draw: function() {
    if (this.x <= 0) {
        this.x = 0;
    } else if (this.y >= (innerHeight - this.height)) {
      this.y = (innerHeight - this.height);
    }
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  }
}

// enemy objects
var cowboy = {
    width: 100,
    height: 100,
    x: innerWidth / 2 + 500,
    y: innerWidth / 2,
    src: '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/Cowboy4_walk with gun_3.png',
    draw: function () {
      let enemy = new Image();
      enemy.src = this.src;
      ctx.drawImage(enemy, this.x, this.y, this.width, this.height);
      ctx.drawImage(enemy, this.x + 40, this.y + 40, this.width, this.height);
    }
}

var scorpion = {
    width: 100,
    height: 100,
    x: innerWidth /2 + 500,
    y: innerWidth / 2,
    src: '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/Scorpion.png',
    draw: function () {
      let enemy = new Image();
      enemy.src = this.src;
      ctx.drawImage(enemy, this.x, this.y, this.width, this.height);
      ctx.drawImage(enemy, this.x - 100, this.y + 20, this.width, this.height);
    }
}


// rotating character function

    // code here

// dom/key movement object & event listeners

var map = {
    37: false, // Left Arrow
    39: false, // Right Arrow
    83: false, // S key
}

document.addEventListener('keydown', function(event){
    if (event.keyCode in map) {
        map[event.keyCode] = true;
        
          if (map[37]) {
            player.x += -20;
        } else if (map[39]) {
            scorpion.x -= 10;
            backgroundOne.x-=3;
            player.x += 2;
        } else if (map[83]) {
            isShooting = true;
            sticks.push({
                x: player.x,
                y: player.y + (player.height /2)
        });
            for(let i = 0; i < sticks.length; i++) {
            ctx.drawImage(stick, sticks[i].x, sticks[i].y);
            sticks[i].x ++;
        }
            
            
        }
    }
});

document.addEventListener('keyup', function(event){
    if(event.keyCode in map) {
        map[event.keyCode] = false;
    }
})


//set timer

document.addEventListener("DOMContentLoaded", function(){
 timeHandler = setInterval(function(){
  if (seconds > 0) {
    headerText.textContent = seconds;
    seconds--;
  } else if (lives === 0) {
    headerText.textContent = "GAME OVER";
  } else {
    headerText.textContent = "TUMBLE!";
    setTimeout(function(){
      headerText.textContent = "TUMBLIN...";
    }, 3000)
    clearInterval(timeHandler);
    }
  }, 1000)
});

// run animation function / add characters to canvas

var animate = function () {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  backgroundOne.draw();
  player.draw();
  enemyInterval = setInterval(scorpion.draw(), 2000); 
}

animate();

