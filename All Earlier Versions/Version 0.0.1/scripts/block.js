// Since this is a block game, we'll need a block object class.
// Constructor takes no arguments for now, but in future might have a 'type' that can be specified when
// we make it so there are multiple block types.

class Block {
    // constructor takes 3 arguments: root HTML element, and x and y position.
    // All blocks will be rendered into the 'world' div, which is setup with a css grid which is taylored to the blocks' dimensions.
    // Block types are all numeric for now.
    constructor(root,x,y,type = 1) {
        this.domElement = document.createElement("img");
        this.domElement.src = `./assets/block${type}.png`;
        this.domElement.style.gridColumnStart = x;
        this.domElement.style.gridRowStart = y;
        this.x = x;
        this.y = y;
        this.position = `${x},${y}`;
        this.domElement.id = this.position;
        root.appendChild(this.domElement);
    }
}
