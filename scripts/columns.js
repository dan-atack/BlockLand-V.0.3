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
        // Now, to broaden the diversity of the wider world:
        // block Printer function will take these arguments, skillfully inserted into the block printer's logic.
        // At first it might be a bit like, identical volcanoes to the left, identical forests to the right, but it's a starT:
        this.currentBiomeLeft = volcano;
        this.currentLeftwardBiomeIdx = 0;
        this.currentBiomeRight = startStage;
        this.currentRightwardBiomeIdx = 0;
    }

    // Methods:
    
    // Method 1: The Block Printer:
    // The BP Mk IV takes an ARRAY representing a stack of specific blocks, to be placed from the bottom up:
    blockPrinter = (columnNumber, blockStack) => {
        let y = 0; // don't forget we still needed to provide a y-coordinate for each block!
        blockStack.forEach(protoBlock => {  // protoBlocks, or blocks in waiting, are integers representing a specific type of block.
        // Embedding the block printing action in a conditional statement to filter out zero values so you can have 'empty' block spaces
            if (protoBlock) {       // # Truthiness! Lets you leave empty spaces in your columns.
                let block = new Block(this.root, columnNumber, y, protoBlock);
                this[`column_${columnNumber}`].blocks.push(block);
            }
            // and then, either way, increase the height and move on to the next block:
            y += 1;
        })
      };

    // Method 2: The Biome Builder - Deploy the Block Printer to render whole biomes, one column at a time as needed!
    // Takes just one argument: The columns (presumes an array, even if it's only got one member) to be rendered.
    // Information on which biome to use is given by the currentBiome<direction> attribute, which changes at the end of every biome!
    biomeBuilder(columns) {
        // Implant conditional statement to determine if we're going right (first case) or left (second case below).
        // If your first column is zero or higher you're going to the right:
        if (columns[0] >= 0) {
            // For every column in the stated range, run the block printer for that column number, and fill with the
            // appropriate column from the current biome:
            columns.forEach(column => {
                this.blockPrinter(column, this.currentBiomeRight[this.currentRightwardBiomeIdx]);
                this.currentRightwardBiomeIdx ++;
                // If you're at the last index position of the current biome, reset the index position counter and load a new biome:
                if (this.currentRightwardBiomeIdx === this.visibilityRange) {
                    this.currentRightwardBiomeIdx = 0;
                    // Will this give us a random biome?????
                    this.currentBiomeRight = biomes[`biome0${(Math.floor(Math.random() * biomes.count))}`];
                }
            })
            // Now for the left:
        } else {
            columns.forEach(column => {
                // For every column in the stated range, run the block printer for that column number, and fill with the
                // appropriate column from the current biome:
                this.blockPrinter(column, this.currentBiomeLeft[this.currentLeftwardBiomeIdx]);
                this.currentLeftwardBiomeIdx ++;
                if (this.currentLeftwardBiomeIdx === this.visibilityRange) {
                    this.currentLeftwardBiomeIdx = 0;
                    this.currentBiomeLeft = biomes[`biome0${(Math.floor(Math.random() * biomes.count))}`];
                }
            })
        }
    };

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
    };

    // Moving through the world: Columns object must derender a column and shift the others as you move towards the edge:

        // Column de/rendering function:
    
    toggleColumn = (columnNumber) => {
        this[`column_${columnNumber}`].rendered = false;
        this[`column_${columnNumber}`].blocks.forEach(block => {
            block.toggleDisappear();
        })
    };

};