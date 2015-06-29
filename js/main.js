//"use strict";

/******************************************************************************
 *                              OBJECT SETUP                                  *
 ******************************************************************************
 *  SUMMARY: Establish main objects and initialize attributes for those       *
 *    objects.                                                                *
 ******************************************************************************
 *  EVENTS: none                                                              *
 ******************************************************************************
 *  FUNCTIONS: none                                                           *
 ******************************************************************************
 *  OBJECTS:                                                                  *
 *    gameBoard - Establish primary grid for the playing area.                *
 *    player - primary player that has a position and size.                   *
 *    pilo - primary familiar with positions, size, and movement vector.      *
 *****************************************************************************/
// create global objects and variable
var gameBoard = {},
  player = {},
  pilo = {},
  keys = [],
  objectSize = 5;


// gameboard settings
gameBoard.size = 900;
gameBoard.color = 'black';
gameBoard.div = document.createElement('div');
gameBoard.style = 'background-color: ' + gameBoard.color;
gameBoard.style += '; width: ' + gameBoard.size + 'px';
gameBoard.style += '; height:' + gameBoard.size + 'px';
gameBoard.style += '; margin: auto;';
gameBoard.style += '; border-radius: 2.5px;';
gameBoard.grass = new Array(gameBoard.size / objectSize);
for (var i = 0; i < gameBoard.size / objectSize; i++) {
  gameBoard.grass[i] = new Array(gameBoard.size / objectSize);
  for (var j = 0; j < gameBoard.size / objectSize; j++) {
    gameBoard.grass[i][j] = 0;
  }
}
gameBoard.grasscount = 0;
gameBoard.div.setAttribute('id', 'gameBoard');
gameBoard.div.style.cssText = gameBoard.style;
// place game board
document.getElementsByTagName("body")[0].appendChild(gameBoard.div);

// player settings
player.size = 5;
player.color = 'white';
player.pos = {};
player.pos.x = 0;
player.pos.y = 0;
// pilo settings
pilo.size = 5;
pilo.color = 'aqua';
pilo.length = 10;
pilo.body = [];
pilo.body[0] = {};
pilo.body[0].x = 3;
pilo.body[0].y = 3;
for (var i = 1; i < pilo.length; i++) {
  pilo.body[i] = {};
  pilo.body[i].x = 3;
  pilo.body[i].y = 3;
}
pilo.speed = 50;
pilo.moveVec = genRandMoveVector();

/******************************************************************************
 *                                   PILO                                     *
 ******************************************************************************
 *  SUMMARY: Pilo is the primary familiar in the game. He begins with a       *
 ******************************************************************************
 *  EVENTS:                                                                   *
 *    setInterval - performs action based on time.                            *
 *      action - pilo moves based on random generator.                        *
 ******************************************************************************
 *  FUNCTIONS:                                                                *
 *    autoAnimatePilo() - generate random movement vector and activate move.  *
 *    movePilo(d) - move pilo based on on direction specified.                *
 *    removePilo() - remove pilo from view.                                   *
 *    showPilo() - displays pilo with given parameters.                       *
 *****************************************************************************/

/******************************************************************************
  name: autoAnimatePilo()
  description: generate random movement vector and activate move.
  parameters: none
******************************************************************************/
function autoMovePilo() {
  pilo.moveVec = genRandMoveVector();
  pilo.autoMove = setInterval(function () {
    movePilo(pilo.moveVec.direction);
  }, pilo.speed);
  pilo.changeDirection = setTimeout(function () {
    clearInterval(pilo.autoMove);
    autoMovePilo();
  }, (pilo.speed * pilo.moveVec.distance));
}

/******************************************************************************
  name: showPilo()
  description: display pilo based on position.
  parameters: none
******************************************************************************/
function showPilo() {
  var piloStyle,
    i;
  
  for (i = 0; i < pilo.length; i++) {
    piloStyle = 'background-color: ' + pilo.color + ';';
    piloStyle = 'background-color: ' + pilo.color + ';';
    piloStyle += 'display: inline-block;';
    piloStyle += 'position: absolute;';
    piloStyle += 'width: ' + pilo.size + 'px;';
    piloStyle += 'height: ' + pilo.size + 'px;';
    piloStyle += 'margin-left: ' + (pilo.body[i].x * player.size) + 'px;';
    piloStyle += 'margin-top: ' + (pilo.body[i].y * player.size) + 'px;';
    piloStyle += 'border-radius: 50%;';
    pilo.div = document.createElement('div');
    if (i === 0) {
      pilo.div.setAttribute('id', 'pilo');
    } else {
      pilo.div.setAttribute('id', 'pilo' + i);
    }
    pilo.div.style.cssText = piloStyle;
    document.getElementById('gameBoard').appendChild(pilo.div);
  }
}

/******************************************************************************
  name: removePilo()
  description: remove pilo from view.
  parameters: none
******************************************************************************/
function removePilo() {
  var i;
  for (i = 0; i < pilo.length; i++) {
    if (i === 0) {
      document.getElementById('pilo').remove();
    } else {
      document.getElementById('pilo' + i).remove();
    }
    
  }
}

/****************************************************************************** 
  name: movePilo(d)
  description: move pilo based on on direction specified
  parameters:
    d - direction that will be translated to changes in position x and y.
******************************************************************************/
function movePilo(d) {
  var tempPos1,
      tempPos2,
      tempPos3,
      tempPos4,
      i;
  tempPos1 = pilo.body[0].x;
  tempPos2 = pilo.body[0].y;
  
  if (d === 'dr') {
    if (pilo.body[0].x < gameBoard.size / pilo.size - 1) {
      pilo.body[0].x += 1;
    }
    if (pilo.body[0].y < gameBoard.size / pilo.size - 1) {
      pilo.body[0].y += 1;
    }
  } else if (d === 'ur') {
    if (pilo.body[0].x < gameBoard.size / pilo.size - 1) {
      pilo.body[0].x += 1;
    }
    if (pilo.body[0].y >= 1) {      
      pilo.body[0].y -= 1;
    }
  } else if (d === 'dl') {
    if (pilo.body[0].y < gameBoard.size / pilo.size - 1) {
      pilo.body[0].y += 1;
    }
    if (pilo.body[0].x >= 1) {
      pilo.body[0].x -= 1;
    }
  } else if (d === 'ul') {
    if (pilo.body[0].x >= 1) {
      pilo.body[0].x -= 1;
    }
    if (pilo.body[0].y >= 1) {
      pilo.body[0].y -= 1;
    }
  } else if (d === 'l') {
    if (pilo.body[0].x >= 1) {
      pilo.body[0].x -= 1;
    }
  } else if (d === 'u') {
    if (pilo.body[0].y >= 1) {
      pilo.body[0].y -= 1;
    }
  } else if (d === 'r') {
    if (pilo.body[0].x < gameBoard.size / pilo.size - 1) {
      pilo.body[0].x += 1;
    }
  } else if (d === 'd') {
    if (pilo.body[0].y < gameBoard.size / pilo.size - 1) {
      pilo.body[0].y += 1;
    }
  }
  for (i = 1; i < pilo.length; i++) {
    tempPos3 = pilo.body[i].x;
    tempPos4 = pilo.body[i].y;
    pilo.body[i].x = tempPos1;
    pilo.body[i].y = tempPos2;
    tempPos1 = tempPos3;
    tempPos2 = tempPos4;
  }
  
  // remove player from current position
  removePilo();
  if (gameBoard.grass[pilo.body[0].x][pilo.body[0].y] === 1) {
    eatGrass(pilo.body[0].x, pilo.body[0].y);
  }
  // add player in new position
  showPilo();
}

/******************************************************************************
 *                                  PLAYER                                    *
 ******************************************************************************
 *  SUMMARY: Primary player character, conrolled by keyboard.                 *
 ******************************************************************************
 *  EVENTS:                                                                   *
 *    keydown - detects when a key is pressed.                                *
 *      action - keysPressed(e)                                               *
 *    keyup - detects when a pressed key is released.                         *
 *      action - keysReleased(e)                                              *
 ******************************************************************************
 *  FUNCTIONS:                                                                *
 *    keysPressed(e) - detects keyboard input and responds accordingly.       *
 *    keysReleased(e) - remove code from active array when key is released.   *
 *    movePlayer(s) - move player based on specified direction.               *
 *    removePlayer() - remove player from view, place in new position.        *
 *    showPlayer() - displays the player with given parameters.               *
 *****************************************************************************/
// Detect arrow key down
window.addEventListener("keydown", keysPressed, false);
// Detect arrow key up
window.addEventListener("keyup", keysReleased, false);

/****************************************************************************** 
  name: keysPressed(e)
  description: detects keyboard input and responds accordingly.
  parameters:
    e - keyboard event that contains the value of the keycode.
******************************************************************************/
function keysPressed(e) {
  // store an entry for every key pressed
  keys[e.keyCode] = true;
  // down and right arrows are pressed simultaneously
  if (keys[39] && keys[40]) {
    movePlayer('dr');
  } else if (keys[38] && keys[39]) {
    movePlayer('ur');
  } else if (keys[37] && keys[38]) {
    movePlayer('ul');
  } else if (keys[37] && keys[40]) {
    movePlayer('dl');
  } else if (keys[37]) {
    movePlayer('l');
  } else if (keys[38]) {
    movePlayer('u');
  } else if (keys[39]) {
    movePlayer('r');
  } else if (keys[40]) {
    movePlayer('d');
  }
}

/****************************************************************************** 
  name: keysReleased(e)
  description: remove code from active array when key is released.
  parameters:
    e - keyboard event that contains the value of the keycode.
******************************************************************************/
function keysReleased(e) {
  keys[e.keyCode] = false;
}

/****************************************************************************** 
  name: showPlayer()
  description: display player with based on position.
  parameters: none
******************************************************************************/
function showPlayer() {
  var style = 'background-color: ' + player.color + ';';
  style += 'display: inline-block;';
  style += 'position: absolute;';
  style += 'width: ' + player.size + 'px;';
  style += 'height: ' + player.size + 'px;';
  style += 'margin-left: ' + (player.pos.x * player.size) + 'px;';
  style += 'margin-top: ' + (player.pos.y * player.size) + 'px;';
  style += 'border-radius: 50%;';
  player.div = document.createElement('div');
  player.div.setAttribute('id', 'player');
  player.div.style.cssText = style;
  document.getElementById('gameBoard').appendChild(player.div);
}

/****************************************************************************** 
  name: removePlayer()
  description: remove player from view.
  parameters: none
******************************************************************************/
function removePlayer() {
  document.getElementById('player').remove();
}

/****************************************************************************** 
  name: movePlayer(d)
  description: move player based on specified direction.
  parameters:
    d - direction that will be translated to changes in position x and y.
******************************************************************************/
function movePlayer(d) {
  if (d === 'dr') {
    if (player.pos.x < gameBoard.size / player.size - 1) {
      player.pos.x += 1;
    }
    if (player.pos.y < gameBoard.size / player.size - 1) {
      player.pos.y += 1;
    }
  } else if (d === 'ur') {
    if (player.pos.x < gameBoard.size / player.size - 1) {
      player.pos.x += 1;
    }
    if (player.pos.y >= 1) {
      player.pos.y -= 1;
    }
  } else if (d === 'dl') {
    if (player.pos.y < gameBoard.size / player.size - 1) {
      player.pos.y += 1;
    }
    if (player.pos.x >= 1) {
      player.pos.x -= 1;
    }
  } else if (d === 'ul') {
    if (player.pos.x >= 1) {
      player.pos.x -= 1;
    }
    if (player.pos.y >= 1) {
      player.pos.y -= 1;
    }
  } else if (d === 'l') {
    if (player.pos.x >= 1) {
      player.pos.x -= 1;
    }
  } else if (d === 'u') {
    if (player.pos.y >= 1) {
      player.pos.y -= 1;
    }
  } else if (d === 'r') {
    if (player.pos.x < gameBoard.size / player.size - 1) {
      player.pos.x += 1;
    }
  } else if (d === 'd') {
    if (player.pos.y < gameBoard.size / player.size - 1) {
      player.pos.y += 1;
    }
  }
  // remove player from current position
  removePlayer();
  // add player in new position
  showPlayer();
}

/******************************************************************************
 *                                  GENERAL                                   *
 ******************************************************************************
 *  SUMMARY: General actions that can be called by multiple objects/functions *
 ******************************************************************************
 *  EVENTS: none                                                              *
 ******************************************************************************
 *  FUNCTIONS:                                                                *
 *    genRandMoveVector() - return random movement of distance and direction. *
 *****************************************************************************/

/****************************************************************************** 
  name: genRandMoveVector()
  description: Creates a vector object and returns it with randomly generated
    distance and direction.
  parameters: none
******************************************************************************/
function genRandMoveVector() {
  var randMoveVector = {};
  randMoveVector.direction = Math.floor((Math.random() * 8) + 1);
  randMoveVector.distance = Math.floor((Math.random() * ((gameBoard.size / 5) / 2)) + 1);
  
  if (randMoveVector.direction === 1) {
    randMoveVector.direction = 'ul';
  } else if (randMoveVector.direction === 2) {
    randMoveVector.direction = 'u';
  } else if (randMoveVector.direction === 3) {
    randMoveVector.direction = 'ur';
  } else if (randMoveVector.direction === 4) {
    randMoveVector.direction = 'r';
  } else if (randMoveVector.direction === 5) {
    randMoveVector.direction = 'dr';
  } else if (randMoveVector.direction === 6) {
    randMoveVector.direction = 'd';
  } else if (randMoveVector.direction === 7) {
    randMoveVector.direction = 'dl';
  } else if (randMoveVector.direction === 8) {
    randMoveVector.direction = 'l';
  }
  return randMoveVector;
}

// place initial player
showPlayer();
// place initial pilo
showPilo();
// start pilo movement
autoMovePilo();

function eatGrass(x, y) {
  var idStr = 'grass' + x + '-' + y;
  pilo.body[pilo.length] = {};
  pilo.body[pilo.length].x = pilo.body[0].x;
  pilo.body[pilo.length].y = pilo.body[0].y;
  pilo.length++;
  gameBoard.grass[x][y] = 0;
  document.getElementById(idStr).remove();
  gameBoard.grasscount--;
  document.getElementById('score').innerHTML = pilo.length;
}

setInterval(function growGrass() {
  var randX,
    randY;
  if (gameBoard.grasscount < 500) {
    randX = Math.floor((Math.random() * (gameBoard.size / player.size)));
    randY = Math.floor((Math.random() * (gameBoard.size / player.size)));
    gameBoard.grass[randX][randY] = 1;
    var style = 'background-color: ' + 'green' + ';';
    style += 'display: inline-block;';
    style += 'position: absolute;';
    style += 'width: ' + player.size + 'px;';
    style += 'height: ' + player.size + 'px;';
    style += 'margin-left: ' + (randX * player.size) + 'px;';
    style += 'margin-top: ' + (randY * player.size) + 'px;';
    style += 'border-radius: 50%;';
    gameBoard.div = document.createElement('div');
    gameBoard.div.setAttribute('id', 'grass' + randX + '-' + randY);
    gameBoard.div.style.cssText = style;
    document.getElementById('gameBoard').appendChild(gameBoard.div);
    gameBoard.grasscount++;
    console.log(grasscount);
  }
}, 50);