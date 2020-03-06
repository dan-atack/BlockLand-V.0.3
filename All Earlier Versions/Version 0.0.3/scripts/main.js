// Here we go!

// Start out by defining links to the index file:

const universe = document.querySelector("body");
const world = document.getElementById("world");
const sidebar = document.getElementById("sidebar");

// Next, call an instance of the game engine so we can refer to and control anything in the world through it:
// Thomas the Game Engine! Get it? I'm sure I'll never come to regret this unconventional naming choice!
const thomas = new Engine(universe);


// Then, the Movement handler function: allows movement based on key inputs.
// Based on the direction a movement attempt is made in, it will restrict movement if the tile to be entered contains a block.

const handlePlayerMovement = (event) => {
    switch(event.code) {
      case "ArrowLeft":
          // New motion restriction sensor: within the block columns object, search for the relevant column,
          // and if none of the blocks in the target column are in the same y-position as you then you're clear to move.
          // For horizontal movement, take the player's current x position +/- one and keep current player y-position:
        if (thomas.blocks.isWayClear(thomas.player.x-1, thomas.player.y)) thomas.player.moveLeft();
        break;
      case "ArrowRight":
        if (thomas.blocks.isWayClear(thomas.player.x+1, thomas.player.y)) thomas.player.moveRight();
        break;
      case "ArrowUp":
        // here we'll base the restriction on the player's y values since up and down are in the same x-value as the player.
        // Recall that the block ABOVE the player has a greater y value, since y is distance from the bottom now:
        if (thomas.blocks.isWayClear(thomas.player.x, thomas.player.y+1)) thomas.player.moveUp();
        break;
      case "ArrowDown":
        if (thomas.blocks.isWayClear(thomas.player.x, thomas.player.y-1)) thomas.player.moveDown();
        break;
    }
  };

// Game starter trigger: To Start Press Any Key

const anyKey = (event) => {
    if (event.code != 0) {
        // The game is on when the clock is running, so this is where the show starts:
        thomas.clockRunning();
        // As soon as the game starts, clean up all of this shit:
        intro.removeDOM();
        instrucs.removeDOM();
        document.removeEventListener("keydown", anyKey);
    }
}

// Run area. CAUTION: LIVE CODE FOLLOWS!

thomas.blocks.fillInitialWorld();

// thomas.blockPrinter(world, 0, 2, 4, 1);
// thomas.blockPrinter(world, 6, 2, 3, 1);
// thomas.blockPrinter(world, 4, 2, 2, 1, 5);
// thomas.blockPrinter(world, 0, 0, 9, 2, 3);

// Intro Message:

let intro = new Text(world, 4, 4, 38, "WELCOME TO BLOCKLAND!!");
let instrucs = new Text(world, 26, -4, 24, "To Start Press the Any Key!");

// Event Listeners activated:

document.addEventListener("keydown", anyKey);

document.addEventListener("keydown", handlePlayerMovement);