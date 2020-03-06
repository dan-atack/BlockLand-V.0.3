// Since this is a block game, we'll need a block object class.
// Constructor takes no arguments for now, but in future might have a 'type' that can be specified when
// we make it so there are multiple block types.

class Block {
    // constructor takes 3 arguments: root HTML element, and x and y position.
    // All blocks will be rendered into the 'world' div, which is setup with a css grid which is taylored to the blocks' dimensions.
    // Block types are all numeric for now.
    constructor(root,x,y,type = 1) {
        this.root = root;
        this.x = x;
        this.y = y;
        this.domElement = document.createElement("img");
        // Block dom element takes its specific image file based on the number given in the constructor function:
        this.domElement.src = `./assets/blocks/block${type}.png`;
        // Block dom Element positions are new given in terms of coordinates multiplied by width, to form a 'pseudo-grid':
        this.domElement.style.position = "absolute";
        this.domElement.style.left = `${(x*BLOCK_WIDTH)}px`;
        // I'm tired of y values descending from the cieling. Let's change that:
        this.domElement.style.bottom = `${(y*BLOCK_WIDTH)}px`;
        this.domElement.classList.add("block");
        this.domElement.id = `${this.x},${this.y}`;
        root.appendChild(this.domElement);
        // We'll use this value to enable the disappear function:
        this.rendered = true;
    }

    horizontalTranslate(horizontalOffset) {
        // blocks' dom elements are shifted when the screen moves. The value for horizontal offset increases as the player goes to the right;
        // So, to make the blocks appear to go to the left, we subtract the horizontal offset from their apparent position:
        this.domElement.style.left = `${(this.x - horizontalOffset) * BLOCK_WIDTH}px`;
    }


    toggleDisappear() {
        if (this.rendered) {
            this.root.removeChild(this.domElement);
            this.rendered = false;
        } else {
            this.root.appendChild(this.domElement);
           this.rendered = true;
        }
    }

};
