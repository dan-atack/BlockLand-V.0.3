// The Game Engine Object will be the central controller for all the things that happen in our little world:

class Engine {
  // Engine's Root will be the HTML body since it will control the whole world as well as the sidebar which is a sort of metaphysical
  // area...
  constructor(root) {
    // first and foremost:
    this.root = root;
    // Next, make a new Columns object to store the blocks by column for easy manipulation:
    this.blocks = new Columns(world, WORLD_WIDTH, 9);
    // The World will be wider than just one screen; to keep track of distant blocks, we'll introduce the horizontal offset value:
    this.horizontalOffset = 0;
    // Screen width is easy to figure out but this will unclutter some later calculations:
    this.screenWidth = (SCREEN_WIDTH/BLOCK_WIDTH);
    // the screenScrollDistance attribute  tells the engine how far from the side of the screen to get before it starts scrolling
    // the landscape. A value of 1 means wait till you're right at the edge.
    this.screenScrollDistance = 2;
    // The player is created through the game engine so it can handle everything that happens to you:
    this.player = new Player(world, 3,6);
    // Add a clock to the sidebar to keep track of the time:
    this.theTime = new Date();
    let hour = this.theTime.getHours();                     // From the date object, get hours.
    hour = ("0"+hour).slice(-2);                    // Here's a handy trick I found on stack overflow to ensure your time values are always 2-digit numbers.
    let min = this.theTime.getMinutes();                    // Get minutes...
    min = ("0"+min).slice(-2);
    let sec = this.theTime.getSeconds();                    // ... and seconds!
    sec = ("0"+sec).slice(-2);
    let timeString = `${hour} : ${min} : ${sec}`;               // Combine these values into a single string
    this.timeDisplay = document.createElement("span");
    this.timeDisplay.id = "timedisplay";
    this.timeDisplay.innerText = timeString;
    sidebar.appendChild(this.timeDisplay);
    // Level 1 victory objectives crudely baked in here:
    this.eastPointAwarded = false;
    this.westPointAwarded = false;
    this.lvlupAchieved = false;
  }

  // Engine Methods:

  checkScreenScroll() {
    // FIRST CONDITIONAL LEADS TO RIGHT-HAND MOVEMENT; SECOND CONDITIONAL TO LEFT-HAND MOVEMENT.
    // if the player's x position is within the 'scroll distance' of the right edge, after calculating the screen's horizontal offset:
    if ((this.player.x === (this.screenWidth - this.screenScrollDistance + this.horizontalOffset)) && (!(this.player.x === (WORLD_WIDTH - this.screenScrollDistance + 1)))) {
      console.log("still scrolling");
      // increase horizontal offset value:  
      this.horizontalOffset += 1;
      // As player's x value increases:
        // First, de-render columns that are behind your x-position by the difference between the screen width and the scroll distance:
      this.blocks.toggleColumn(this.player.x - (this.screenWidth - this.screenScrollDistance));
        // Then, if there are any, re-render any tiles that exist in front of you, or create some new ones if there aren't any!
      if (this.blocks[`column_${this.player.x + this.screenScrollDistance}`].blocks.length !== 0) {
        this.blocks.toggleColumn(this.player.x + this.screenScrollDistance)
      } else {
        this.blocks.blockPrinter((this.player.x + this.screenScrollDistance), ((this.horizontalOffset % 2) + 3));
      }
        // Then, shift all visible columns' dom elements back (their coordinates don't change since they're not actually moving):
      for (let i = this.horizontalOffset; i <= (this.player.x + this.screenScrollDistance); i++) {
        this.blocks[`column_${i}`].blocks.forEach(block => {
          block.horizontalTranslate(this.horizontalOffset);
        });
      }
        // Finally, the player character image is translated backward with the terrain:
      this.player.horizontalTranslate(this.horizontalOffset);
    // PHew! Now for leftward movement:
      // The lefthand movement version of this function is almost a perfect mirror, but you have to subtract 1 from all
      // calculations involving the h-offset AND the player's x value because the column count starts at zero:
    } else if ((this.player.x === (this.screenScrollDistance + this.horizontalOffset - 1)) && (!(this.player.x === (-WORLD_WIDTH + this.screenScrollDistance -1)))) {
      this.horizontalOffset -= 1;
      console.log("h-off " + this.horizontalOffset);
      this.blocks.toggleColumn(this.player.x + (this.screenWidth - this.screenScrollDistance));
      console.log("toggling column " + (this.player.x + (this.screenWidth - this.screenScrollDistance)))
      //
      if (this.blocks[`column_${this.player.x - this.screenScrollDistance}`].blocks.length !== 0) {
        console.log("toggling visibility on column " + (this.player.x - this.screenScrollDistance))
        this.blocks.toggleColumn(this.player.x - this.screenScrollDistance)
      } else {
        this.blocks.blockPrinter((this.player.x - this.screenScrollDistance), ((-this.horizontalOffset % 2) + 2));
      }
      console.log("running translate functions on columns " + (this.horizontalOffset) + " through " + (this.screenWidth + this.horizontalOffset - 1))
      for (let i = (this.horizontalOffset); i <= (this.screenWidth + this.horizontalOffset - 1); i++) {
        this.blocks[`column_${i}`].blocks.forEach(block => {
          block.horizontalTranslate(this.horizontalOffset);
        });
      }
      //
      this.player.horizontalTranslate(this.horizontalOffset);
    }
  }

  // Game Loop is called Clock Running:

  clockRunning() {
    setInterval(() => {
      // Everything in here is part of the constant cycle:
        // Time:
      this.theTime = new Date();
      let hour = this.theTime.getHours();
      hour = ("0"+hour).slice(-2);
      let min = this.theTime.getMinutes();
      min = ("0"+min).slice(-2);
      let sec = this.theTime.getSeconds();
      sec = ("0"+sec).slice(-2);
      let timeString = `${hour} : ${min} : ${sec}`;
      this.timeDisplay.id = "timedisplay";
      this.timeDisplay.innerText = timeString;
      // Run prototype scroll checker method:
      // Distance:
      // If the player gets close to the edge then we translate the world around them:
      this.checkScreenScroll();
        // Gravity 101: Check if player is 'over' a block; if not, move them down by one spot. Repeat.
        if (this.blocks.isWayClear(thomas.player.x, thomas.player.y-1)) thomas.player.moveDown();
      //  Reset Player's movement cooldowns (movement spam preventors)
      this.player.rightCoolingDown = false;
      this.player.leftCoolingDown = false;
      // Level one objectives baked in here (only temporarily, Lloyd):
      if (this.player.eastEnder && (!(this.eastPointAwarded))) {
        this.player.experience += 1;
        console.log("+1 XP - Good job!");
        this.eastPointAwarded = true;
      }
      if (this.player.westEnder && (!(this.westPointAwarded))) {
        this.player.experience += 1;
        console.log("+1 XP - Good job!");
        this.westPointAwarded = true;
      }
      if ((this.player.experience == 2) && (!(this.lvlupAchieved))) {
        console.log("congratulations, you have just leveled up!");
        this.lvlupAchieved = true;
      }
      // Refresh the universe every 50 ms
    }, 100);
  };

};