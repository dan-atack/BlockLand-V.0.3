// The Player Class! You'll start out as a little sprite and maybe eventually you'll be able to move. If you're good.
// For starters let's just render the player on the board just like we do for the blocks.
class Player {
    constructor(root, xStart, yStart) {
        this.domElement = document.createElement("img");
        this.domElement.src = "./assets/player.png";
        this.x = xStart;
        this.y = yStart;
        this.domElement.style.gridColumnStart = this.x;
        this.domElement.style.gridRowStart = this.y;
        this.position = `${this.x},${this.y}`;
        this.domElement.id = "player";
        root.appendChild(this.domElement);
    }

// Player methods! Movement responders come first:

moveLeft () {
    // If you're not at the left-most edge of the board,
    if (!(this.x == 1)) {
        // this function will subtract 1 from your x value, then update the player's dom element location.
        this.x -=1;
        this.domElement.style.gridColumnStart = this.x;
    }
}

moveRight () {
    // If you're not at the right-most edge of the board,
    if (!(this.x == 9)) {
        // this function will add one to your x value, then update the player's dom element location.
        this.x +=1;
        this.domElement.style.gridColumnStart = this.x;
    }
}

moveUp () {
    // If you're not at the top of the board,
    if (!(this.y == 1)) {
        // this function will add one to your x value, then update the player's dom element location.
        this.y -=1;
        this.domElement.style.gridRowStart = this.y;
    }
}

moveDown () {
    // If you're not at the top of the board,
    if (!(this.y == 9)) {
        // this function will add one to your x value, then update the player's dom element location.
        this.y +=1;
        this.domElement.style.gridRowStart = this.y;
    }
}

};