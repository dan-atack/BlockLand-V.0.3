// When the Engine's block list became unwieldy it became an ideal candidate for objectification:

class Columns {
    constructor(root, numOfCols, visibilityRange) {
        this.root = root;
        // Columns start at the negative of the specified number, so the world expands in both directions:
        // Adding one to the number of columns here 'pads' the world for the benefit of the isWayClear method, which
        // always checks the next row (just so you don't get an ugly little error message when you try to move into a wall)
        for (let i = -(numOfCols + 1); i <= (numOfCols + 1); i++) {
            // Each column is an object with a unique name:
            this[`column_${i}`] = {};
            // Each column contains a list of the blocks it contains:
            this[`column_${i}`].blocks = [];
            // Each column also holds a boolean for whether to render its contents:
            this[`column_${i}`].rendered = true; // start out with everything rendered for now...
        }
        // This will be used later to calculate when to de-render stuff:
        this.visibilityRange = visibilityRange;
    }

    // Methods: First, the brand spanking new column-based Block Printer:
    // Takes far fewer arguments than its predecessor, since it just makes one column at a time:
    blockPrinter = (columnNumber, height = 1, topBlockType = 2) => {
        // This for loop will print one block for every unit of height, starting from the bottom:
        // The loop now stops at one level below the requested height, so we can place some grass on top:
        for (let i = 0; i < (height); i++) {
            let block = new Block(this.root, columnNumber, i);
            this[`column_${columnNumber}`].blocks.push(block);
        }
        // Custom top-block rendered outside of the for loop:
        let topBlock = new Block(this.root, columnNumber, height, topBlockType);
        this[`column_${columnNumber}`].blocks.push(topBlock);
      };
    
    // Quick n dirty way to fill one screen with columns; will tweak later on to add variety:
    // BTW, THIS is where it will be fun to use math to generate interesting 'biomes'...
    fillInitialWorld = () => {
        for (let i = 0; i < this.visibilityRange; i++) {
            // Biome style One: The modulo undulation:
            this.blockPrinter(i, (3 + i % 3));
        }
    }

    // Relocating the check for the player's movement as a method of the columns object.
    // Works for horizontal and vertical movement, provided it is setup properly in the main's key handler function.

    // Take the column that interests you, and check if it contains any blocks at the y-value that would obstruct your path:
    isWayClear = (columnNumber, yPos) => {
        // the clear variable will be changed to false if there's a block in your way, in which case you can't pass:
        let clear = true;
        // Given a column, check all its blocks for a target y value; return false if this value is found (false = way is blocked)
        this[`column_${columnNumber}`].blocks.forEach(block => {
            // as soon as the loop encounters a block that shares the player's y value, return false to prevent movement:
            if (block.y == yPos) {
                clear = false;
                return; 
            }
        })
        // If nothing gets in your way, you are clear to move!
        return clear;
    }

    // Moving through the world: Columns object must derender a column and shift the others as you move towards the edge:

        // Column de/rendering function:
    
    toggleColumn = (columnNumber) => {
        this[`column_${columnNumber}`].rendered = false;
        this[`column_${columnNumber}`].blocks.forEach(block => {
            block.toggleDisappear();
        })
    }

}