// Enemies our player must avoid
var Enemy = function(x, y, sp) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.sp = Math.random() * 100 * sp;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.sp * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 550) {
        this.x = -100;
        this.sp = 100 + Math.floor(Math.random() * 512);
    }

    // if there is collision between player and enemies then it will restart the game
    if (player.x < this.x + 60 &&player.x + 37 > this.x &&player.y < this.y + 25 &&30 + player.y > this.y) 
        this.restart();
};

// method to restart
Enemy.prototype.restart = function(){
    player.x = 200;
    player.y = 380;

    let w =document.querySelector('canvas');
    
    w.style.webkitAnimationName= "flash";
    setTimeout(function () {
       w.style.animationName = "flash";
    }, 1);
        
        w.removeAttribute("style");
   }
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
     this.x = 200;
      this.y = 380;
      this.sp = 40;
      this.sprite = 'images/char-princess-girl.png';
    };

Player.prototype.update = function(dt) {
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }

    // if the player reach the water then winning the game
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        alert("CONGRATULATIONS , YOU WIN -_-");
    }
};
  Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(arrow) {
    if (arrow === "left" && this.x >= 100) {
      this.x -= 100;
    }
    if (arrow === "right" && this.x <= 300) {
      this.x += 100;
    }
    if (arrow === "up" ) {
      this.y -= 83;
    }
    //  309 = 392(all height) - 83
    if (arrow === "down" && this.y <= 309) {
      this.y += 83;
    }
  };

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var allEnemies = [];
var enemyPosition = [60, 140, 220];
var enemy;

enemyPosition.forEach(function(pos) {
    enemy = new Enemy(0, pos, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
