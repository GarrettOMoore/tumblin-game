# tumblin-game

Made Feb 2019 by Garrett Moore - WDI student at General Assembly Seattle, WA.

# CONTROLS

Forward Arrow Key === Move player forward

F Key === Fire projectile

## ABOUT

I created Tumblin... using HTML5 Canvas, Javascript, and CSS. 

### 2/1 
    I began wireframing and outlining the general concepts behind the game. Knowing that I was to be using the

    technologies listed above, I started to sketch out some basic functionality and how I might implement them.

![alt text](/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/IMG_5429.JPG "Beginning sketch 1")

![alt text](/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/IMG_5430.JPG "Beginning sketch 2")

### 2/4 
    Drew up basic canvas & background/player/enemy variables. Collected all images and music via 
    
    OpenGameArt.org.

### n2/5 
    Initialized a moving background to stretch the length of each level. I used photoshop to repeat each 
    
    background image to given length that would make up the width of each level (~ 630 px). Was able to draw on 
    
    the individual characters at their respective levels throughout game, but at this point was only able to 
    
    draw each one once. Next steps needed were to write functions to repeatedly draw each enemy a given number 
    
    of times for each level. 

### 2/6 
    Created a handler for any enemy character to be passed into and repeatedly drawn from
    
    example: 

                                ```function Entity(x, y, width, height, src) {
                                    this.x = x;
                                    this.y = y;
                                    this.width = width;
                                    this.height = height;
                                    this.src = src;
                                };```

    Then I was able to set intervals at different times to push each enemy variable 
    
    example:
                 ```var scorpion = new Entity (player.x + 1000, (innerWidth/2) + 20, 100, 100, '/Users/garrettmoore/Code/Unit1/tumblin-game/imgs/Scorpion.png');```

to an Enemies array, then subsequently draw them on the screen every couple of seconds. Since the X value was 

set based on the player's - it ensured that each enemy would only be drawn on in front of the player by a set 

amount of pixels.

### 2/7 
    
    Wrote in a shooting mechanic - similar to how I handled the enemy characters. I created a template that I 
    
    could just pass the new bullet variable into, then have it set to be drawn on and propelled forward 
    
    everytime a specific key event occured.

### 2/8 

    Programmed collision detection logic for whenever a player encountered an enemy, or an enemy encountered a 
    
    player projectile. I used a basic rectangular collision alogorithm with some slightly tweaked parameters to 
    
    have it trigger an event when either of these collisions occured. In the case of a player collision with 
    
    the enemy, the enemy was bounced backward and the lives count was reduced by one. When an enemy collided 
    
    with a player projectile, the image was changed to that of an explosion, and the player score was 
    
    incremented by 10.

### 2/9 
    
    Set background music to be triggered at each level change, as well as different sounds for either type of 
    
    collision. Unable to succesfully have the level one music play everytime the page is loaded. I've been 
    
    experimenting with different preloading methods, and have yet to find one that works all of the time. 

### 2/10 
    
    Changed last level enemy to stop scrolling of the backround image. Planning to program more advanced kind 
    
    of AI for this (ie movements based on player location, enemy projectiles, etc).

### 2/11 
    
    Refactoring code and trying to enable player character to roll as it's moved along the screen. Unsucessful 
    
    in rolling character, but hoping to get it sorted.

## Things I would like to add


Upon revisting this project, it is my hope that I can add some functionality and design that I was unable to 

this first time around. Smooth transitions between levels, boss AI, rolling player chracter being the top 

priorities.  

## Game Art & Music

#### All game art and music was found courtesy of OpenGameArt.org contributors.

Background images by Dylan Squires.

Cowboy sprite by software_atelier

Scorpion sprite by madameberry

Snake sprite by 494949

Forest boss by S.Groundwater

Level One and Two music by You're Perfect Studio

Enemy collision sound by dklon

Player collision sound by qubodup

Level Three music by Spring

Win music by remaxim

Game over sound by den_yes