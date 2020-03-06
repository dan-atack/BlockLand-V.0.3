// Since this is a block game, we'll need a block object class.
// Constructor takes no arguments for now, but in future might have a 'type' that can be specified when
// we make it so there are multiple block types.

class Block {
    // constructor takes 3 arguments: root HTML element, and x and y position.
    // All blocks will be rendered into the 'world' div, which is setup with a css grid which is taylored to the blocks' dimensions.
    // Block types are all numeric for now.
    constructor(root,x,y,type = 1) {
        this.x = x;
        this.y = y;
        this.domElement = document.createElement("img");
        // Block dom element takes its specific image file based on the number given in the constructor function:
        this.domElement.src = `./assets/block${type}.png`;
        // Block dom Element positions are new given in terms of coordinates multiplied by width, to form a 'pseudo-grid':
        this.domElement.style.position = "absolute";
        this.domElement.style.left = `${(x*BLOCK_WIDTH)}px`;
        this.domElement.style.top = `${(y*BLOCK_WIDTH)}px`;
        this.position = [x, y];
        this.domElement.classList.add("block");
        this.domElement.id = `${this.position}`;
        root.appendChild(this.domElement);
    }
};
