## In the Beginning there was nothing...

---
<img src="assets/Screenshots/Nothing.png" style="width: 60%;"/>
---

## Then there was the world!

---
<img src="assets/Screenshots/the_world.png" style="width: 60%;"/>
---

## PHASE ONE GOALS:

In the initial setup phase, I want to be able to run a function that will populate an onscreen grid with tiles, then have a player character tile that can be moved around using the arrow keys.


## Then came the lengthy list of to-do items, unblued when they're completed:

---

## Incremental Change Log:

1. Render one block, at the middle of the screen.

2. Render 4 more blocks in a row at the top of the screen.

3. Create block object class, in a separate file. And move all .js files to scripts folder.

4. Test block object class by making a block with it.

5. Update block maker function so that it is limited by the world's x-dimension when adding new blocks to a row.

6. Add dimensions to the world as global variables.

7. I really want the world to be a ball at the middle, rather than a line at the top. Let's change the original block-maker function, so it can be assigned start and stop coordinates that are 'out in the world' instead of being stuck at the top...
Success! It even remembered where the world ended and dropped to the next row at the appropriate spot!
---
<img src="assets/Screenshots/block_loop.png" style="width: 60%;" />
---

8. Now I think we've just about perfected the basic block maker function. Time to embed it in another function, the Block Printer, which will take parameters which define a shape, and call the block maker function to make this shape. We'll start with... a rectangle!

9. At Lauren's request, also added block classes somewhat ahead of schedule. A little bit clunky now with the block functions as they are, so it's high time to consolidate the block maker function into one module.

10. Create a Player Class: Start by just rendering the player to the world in a given location.

11. Add player method to enable movement when called by game engine button handling function.

12. Add button handling function in game engine that calls player movement method.

13. Add button listener and test it out!

14. Save the Project in version 0.1 file to safeguard all this progress against future tampering!

---
<img src="assets/Screenshots/Phase_1_complete.png" style="width: 60%;" />

## PHASE TWO GOALS:

In phase two time will be introduced, although it won't immediately have any effect on the game.
I'll create a sidebar to hold a timer, and then have the player perform some action that registers on the side bar.
I'm thinking, run from one side to the other and have a console.log statement acknowledging how fast you did it.