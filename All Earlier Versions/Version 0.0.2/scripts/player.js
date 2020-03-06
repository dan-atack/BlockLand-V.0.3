// The Player Class! You'll start out as a little sprite and maybe eventually you'll be able to move. If you're good.
// For starters let's just render the player on the board just like we do for the blocks.
class Player {
    constructor(root, xStart, yStart) {
        this.x = xStart;
        this.y = yStart;
        this.domElement = document.createElement("img");
        this.domElement.src = "./assets/player.png";
        this.domElement.style.left = `${this.x * PLAYER_WIDTH}px`;
        this.domElement.style.top = `${this.y * PLAYER_WIDTH}px`;
        this.position = `${this.x},${this.y}`;
        this.domElement.id = "player";
        this.domElement.className = "player";
        root.appendChild(this.domElement);
        // attempting to introduce movement over time... later on!
        this.speed = 1;
    }

// Player methods! Movement responders come first:

    moveLeft () {
        // If you're not at the left-most edge of the board (still treating x and y coords like grid locations)
        if (!(this.x == 0)) {
            // this function will subtract 1 from your x value, then update the player's dom element location.
            this.x -= 1;
            this.domElement.style.left = `${this.x *PLAYER_WIDTH}px`;
        }
    }

    moveRight () {
        // If you're not at the right-most edge of the board,
        if (!(this.x == (WORLD_WIDTH/PLAYER_WIDTH -1))) {
            // this function will add one to your x value, then update the player's dom element location.
            this.x += 1;
            this.domElement.style.left = `${this.x * PLAYER_WIDTH}px`;
        }
    }

    moveUp () {
        // If you're not at the top of the board,
        if (!(this.y == 0)) {
            // this function will subtract 1 from your y value (positive y is distance from the top),
            // then update the player's dom element location.
            this.y -= 1;
            this.domElement.style.top = `${this.y * PLAYER_WIDTH}px`;
        }
    }

    moveDown () {
        // If you're not at the bottom of the board,
        if (!(this.y == (WORLD_WIDTH/PLAYER_WIDTH -1))) {
            // this function will add one to your y value, then update the player's dom element location.
            this.y += 1;
            this.domElement.style.top = `${this.y * PLAYER_WIDTH}px`;
        }
    }
};