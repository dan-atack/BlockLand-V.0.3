// This file is for universal constants: few global variables that affect the fundamental physics of our little world:

// World Constraints: Establishing the maximum size of the entire world, in terms of width in columns,
// spreading in either direction of the initial game screen:

const WORLD_WIDTH = 25;

const gravity = 0;

// Display area constants: establishing the width of the world that is visible on the screen:
// The screen is made of pixels, and all the objects within are too, in order for things to act in that 'pseudo-grid' style we love:
const SCREEN_WIDTH = 576;
const SCREEN_HEIGHT = 576;
// Player and block sprites will be exactly 1/9th of the display area's size, to give us that 'pseudo-grid' positioning system:
const BLOCK_WIDTH = 64;
const PLAYER_WIDTH = 64;

