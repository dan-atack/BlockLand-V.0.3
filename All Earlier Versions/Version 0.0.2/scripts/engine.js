// Here we go!

// Start out by defining links to the index file:

const world = document.getElementById("world");
const sidebar = document.getElementById("sidebar");

// After that, we'll have a few global variables that affect the fundamental physics of our little world:

const WORLD_WIDTH = 576;
const WORLD_HEIGHT = 576;

const BLOCK_WIDTH = 64;
const PLAYER_WIDTH = 64;

// We'll use this some day.
const gravity = 0;

// Keep an array with the block objects so we can keep track of them after they're rendered.

let blocks = {};
// populate the blocks object with some empty 'columns' to store the blocks' positions later on:
for (let i = -1; i <= 9; i++) {
  blocks[`column_${i}`] = [];
}

// When called the Block Printer function will generate blocks to create a requested shape on the map of the world.
// Block Printer function takes arguments for the blocks' root, x and y start positions, height, width, and type of block to render.
 
const blockPrinter = (root, xStart = 1, yStart = 1, width = 1, height = 1, blockType = 1, shape = "rectangle") => {
  // When we switched away from the grid, column 1 became x-position zero, so now we subract one:
  let y = yStart - 1;
  let x = xStart - 1;
  switch (shape) {
    case "rectangle":
      // Starting at the top, start printing horizontal rows of specified width and stop when the current row matches requested height.
      for (let i = 0; i < height; i++) {
        // the original block maker function: Prints one row at a time using width and x-start params:
        // Name component added to for loop so I can break back to it if a line exceeds max width!
          line:
          for (let i = 0; i < width; i++) {
            // Create new block giving it root, x, y and blocktype parameters:
              let block = new Block(root, x, y, blockType)
              console.log(blocks)
              // append new block to blocks OBJECT. Blocks object has named columns, each of which only stores y-values that are full:
              blocks[`column_${x}`].push(block.y);
              // Move to next position along current row.
              x += 1;
              // If next position is out of bounds, log that to the console and move on to the next row.
              if (x === (WORLD_WIDTH/BLOCK_WIDTH) + 1) {
                console.log("Max world width reached. Row terminated.")
                break line;
              }
          }
        // Once a line is printed, add one to y, reset x, continue to print the next line.
        y++;
        x = xStart;
      }
  }
};

// Clock Function: Takes the time and displays it on the sidebar.

let theTime = new Date();
let hour = theTime.getHours();                     // From the date object, get hours.
hour = ("0"+hour).slice(-2);                    // Here's a handy trick I found on stack overflow to ensure your time values are always 2-digit numbers.
let min = theTime.getMinutes();                    // Get minutes...
min = ("0"+min).slice(-2);
let sec = theTime.getSeconds();                    // ... and seconds!
sec = ("0"+sec).slice(-2);
let timeString = `${hour} : ${min} : ${sec}`;               // Combine these values into a single string
let timeDisplay = document.createElement("span");
timeDisplay.id = "timedisplay";
timeDisplay.innerText = timeString;
sidebar.appendChild(timeDisplay);


// Movement handler function: allows movement based on key inputs.
// Now, based on the direction a movement attempt is made in, it will restrict movement if the tile to be entered contains a block.

const handlePlayerMovement = (event) => {
  switch(event.code) {
    case "ArrowLeft":
      // If the row to the left of the player is full (the row at player.x-1), don't let him move there.
      if (!(blocks[`column_${player.x-1}`].includes(player.y))) {
        player.moveLeft();
      }
      break;
    case "ArrowRight":
      if (!(blocks[`column_${player.x+1}`].includes(player.y))) {
        player.moveRight();
      }
      break;
    case "ArrowUp":
      // here we'll base the restriction on the player's y values since up and down are in the same x-value as the player.
      // Recall that the block ABOVE the player has a smaller y value, since y is distance from the top:
      if (!(blocks[`column_${player.x}`].includes(player.y-1))) {
        player.moveUp();
      }
      break;
    case "ArrowDown":
      if (!(blocks[`column_${player.x}`].includes(player.y+1))) {
        player.moveDown();
      }
      break;
  }
};


// Run area. CAUTION: LIVE CODE FOLLOWS!

let player = new Player(world, 4,2);

blockPrinter(world, 5, 5, 3, 1, 2);
blockPrinter(world, 4, 6, 5, 1);
blockPrinter(world, 3, 7, 7, 1);
blockPrinter(world, 2, 8, 8, 1);
blockPrinter(world, 1, 9, 9, 1);


function clockRunning() {
  setInterval(() => {
    let theTime = new Date();
    let hour = theTime.getHours();
    hour = ("0"+hour).slice(-2);
    let min = theTime.getMinutes();
    min = ("0"+min).slice(-2);
    let sec = theTime.getSeconds();
    sec = ("0"+sec).slice(-2);
    let timeString = `${hour} : ${min} : ${sec}`;
    timeDisplay.id = "timedisplay";
    timeDisplay.innerText = timeString;
    // Gravity 101: Check if player is 'over' a block; if not, move them down by one spot. Repeat.
    if (!(blocks[`column_${player.x}`].includes(player.y+1))) {
      player.moveDown();
    }
  }, 500);
};

clockRunning();


// Event Listeners activated:

document.addEventListener("keydown", handlePlayerMovement);