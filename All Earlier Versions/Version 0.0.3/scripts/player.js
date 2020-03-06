// The Player Class! You'll start out as a little sprite and maybe eventually you'll be able to move. If you're good.
// For starters let's just render the player on the board just like we do for the blocks.
class Player {
    constructor(root, xStart, yStart) {
        this.x = xStart;
        this.y = yStart;
        this.domElement = document.createElement("img");
        this.domElement.src = "./assets/player.png";
        this.domElement.style.left = `${this.x * PLAYER_WIDTH}px`;
        this.domElement.style.bottom = `${this.y * PLAYER_WIDTH}px`;
        this.position = `${this.x},${this.y}`;
        this.domElement.id = "player";
        this.domElement.className = "player";
        root.appendChild(this.domElement);
        // attempting to introduce movement over time... later on!
        this.speed = 1;
        // We'll keep track of the horizontal offset here to regulate the player's movement animation.
        // It will only be changed by the 'translate' method, so you'll be able to move around normally when you're
        // off to the side of the original world:
        this.horizontalOffset = 0;
        // Movement cooldowns to prevent you spamming the buttons:
        this.leftCoolingDown = false;
        this.rightCoolingDown = false;
        // Let's RPG it up a bit!
        this.experience = 0;
        this.westEnder = false;
        this.eastEnder = false;
    }

// Player methods! Movement responders come first:


    moveRight () {
        // For the time being, I'm attaching a cooldown to each movement method out of sympathy for the game engine's nerves:
        if ((!(this.rightCoolingDown)) && (!(this.x == WORLD_WIDTH))) {
            // this function will add one to your x value, then update the player's dom element location.
            // If you walk towards the edge of the screen, your x value continues to increase,
            // but your dom Element is essentially pushed back into the main screen, and the distance between the
            // original screen's coordinates and your real x value is represented by the horizontal offset value:
            this.x += 1;
            this.domElement.style.left = `${(this.x - this.horizontalOffset) * PLAYER_WIDTH}px`;
            this.rightCoolingDown = true;
            console.log(this.x);
        }
    }

    moveLeft () {
        // Attempting to impose move limitation based on world width:
        if ((!(this.leftCoolingDown)) && (!(this.x == -WORLD_WIDTH))) {
            this.x -= 1;
            this.domElement.style.left = `${(this.x - this.horizontalOffset)* PLAYER_WIDTH}px`;
            // The game engine will check and reset this value every cycle:
            this.leftCoolingDown = true;
        }
        // this function will subtract 1 from your x value, then update the player's dom element location.

    }

    moveUp () {
        // If you're not at the top of the board,
        if (!(this.y >= (SCREEN_HEIGHT/PLAYER_WIDTH -1))) {
            // this function will subtract 1 from your y value (positive y is distance from the bottom now),
            // then update the player's dom element location.
            this.y += 2 ;
            this.domElement.style.bottom = `${this.y * PLAYER_WIDTH}px`;
            // Adding a condition to level one's victory clause wherein you must jump to get your xp for visiting the edges:
            if (this.x === WORLD_WIDTH) {
                this.westEnder = true;
            } else if (this.x === -WORLD_WIDTH) {
                    this.eastEnder = true;
            }
        }
    }

    moveDown () {
        // If you're not at the bottom of the board,
        if (!(this.y == 0)) {
            // this function will add one to your y value, then update the player's dom element location.
            this.y -= 1;
            this.domElement.style.bottom = `${this.y * PLAYER_WIDTH}px`;
        }
    }

    horizontalTranslate (horizontalOffset) {
        // as the player moves through the world, the player's x value will keep an absolute frame of reference,
        // but the dom element must stay centered, so it will be translated. Subracting the h offset makes it
        // so that your character appears further to the left than their absolute position suggests...
        this.horizontalOffset = horizontalOffset;
        this.domElement.style.left = `${(this.x - horizontalOffset) * PLAYER_WIDTH}px`
    }
};
