// Here we go!

// Start out by defining links to the index file:

const world = document.getElementById("world");

// After that, we'll have a few global variables that affect the fundamental physics of our little world:

const WORLD_WIDTH = 576;
const WORLD_HEIGHT = 576;

const BLOCK_WIDTH = 64;
const PLAYER_WIDTH = 64;

// We'll use this some day.
const gravity = 0;

// Keep an array with the block objects so we can keep track of them after they're rendered.

let blocks = [];

// When called the Block Printer function will generate blocks to create a requested shape on the map of the world.
// Block Printer function takes arguments for the blocks' root, x and y start positions, height, width, and type of block to render.
 
const blockPrinter = (root, xStart = 1, yStart = 1, width = 1, height = 1, blockType = 1, shape = "rectangle") => {
  let y = yStart;
  let x = xStart;
  switch (shape) {
    case "rectangle":
      // Starting at the top, start printing horizontal rows of specified width and stop when the current row matches requested height.
      for (let i = 1; i <= height; i++) {
        // the original block maker function: Prints one row at a time using width and x-start params:
        // Name component added to for loop so I can break back to it if a line exceeds max width!
          line:
          for (let i = 1; i <= width; i++) {
            // Create new block giving it root, x, y and blocktype parameters:
              let block = new Block(root, x, y, blockType)
              // append new block to blocks list.
              blocks.push(block);
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


// Movement handler function: allows movement based on key inputs, and you could also specify which entity to apply it to...
// ... We'll start with the player's sprite for now though.

const handlePlayerMovement = (event) => {
  console.log("event: ", event.code)
  switch(event.code) {
    case "ArrowLeft":
      console.log("left arrow detected");
      player.moveLeft();
      break;
    case "ArrowRight":
      player.moveRight();
      break;
    case "ArrowUp":
      player.moveUp();
      break;
    case "ArrowDown":
      player.moveDown();
      break;
  }
};


// Run area. CAUTION: LIVE CODE FOLLOWS!

let player = new Player(world, 4,2);

blockPrinter(world, 3, 3, 5, 3, 2);
blockPrinter(world, 3, 6, 5, 3);

// Event Listeners activated:

document.addEventListener("keydown", handlePlayerMovement);