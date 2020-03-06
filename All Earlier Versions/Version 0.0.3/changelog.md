# In the Beginning there was nothing...

---
<img src="assets/Screenshots/Nothing.png" style="width: 60%;"/>
---

# Then there was the world!

---
<img src="assets/Screenshots/the_world.png" style="width: 60%;"/>
---

# PHASE ONE: Creating the World

In the initial setup phase, I want to be able to run a function that will populate an onscreen grid with tiles, then have a player character tile that can be moved around using the arrow keys.

## Then came the lengthy list of to-do items, uncommented when they're completed:

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

8. Now I think we've just about perfected the basic block maker function. Time to upgrade it to the Block Printer, which will take parameters which define a shape, and call the block maker function to make this shape. We'll start with... a rectangle!

9. At Lauren's request, also added block classes somewhat ahead of schedule. A little bit clunky now with the block functions as they are, so it's high time to consolidate the block maker function into one module.

10. Create a Player Class: Start by just rendering the player to the world in a given location.

11. Add player method to enable movement when called by game engine button handling function.

12. Add button handling function in game engine that calls player movement method.

13. Add button listener and test it out!

14. Save the Project in version 0.1 file to safeguard all this progress against future tampering!

---
<img src="assets/Screenshots/Phase-1.png" style="width: 60%;" />
---

# PHASE TWO: The Laws of Motion

In phase two time will be introduced, in order to regulate motion. The CSS grid setup that was initially used to render the blocks on the screen will be abandoned in favour of a 'pseudo-grid' like the cats game had. Blocks don't move so their positions can be given in grid-like intervals so their render function won't change much, but the player avatar will be able to move about the world smoothly, with position changing according to inputs from the arrow keys. The ultimate goal of this phase will be to allow the player to move and jump around on top of the terrain and be restricted by the presence of blocks - you can jump over a single block but a wall of 2 or more blocks in height is an impassable obstacle. For the moment, the player's avatar will always come to rest in an exact 'pseudogrid' position, but the movement between spaces will be smooth and can be controlled by the transition speed setting in CSS.

## Incremental Goals:

1. Time to add a timer! We'll just borrow the real time for now and keep track of it off to the side somewhere...

2. Speaking of off to the side, let's add a sidebar along the right side of the page to keep track of stuff like the time (and a lot of other things eventually if we're lucky).

3. Get off the grid! Replace the current grid display with a more fluid frame of reference that MIMICS the grid in terms of simple block deployment, but leaves open the possibility of the player moving around in a more fluid manner. Start by remaking the blocks' render function and corresponding constructor attributes to comply with the new way, brother.

4. Using the block locations array to keep track of where the player can and can't go: in the game engine, have the player's movement handler function query the blocks array to establish whether the user is next to a block in the direction they're asking to move. The pseudo-grid rules governing the player's movement should make this fairly easy.

5. To save on memory, or get some kind of gravity boost, re-arrange blocks array into an object containing an attribute representing each column, in the form on an array: e.g. {Col A: [1,2,3], Col B: [2,3,4], ... } Thus each column can have a name which is the x-value, and each block within only needs to provide its y coordinate as proof that a particular 'cell' is occupied.

6. Gravity. Make it so that, if the column you're in doesn't contain a block in the cell below you, you move into that cell. This might involve a game time loop...
... It works! You can even jump up if it's just one tile, although it's a little bit clunky.

---
<img src="assets/Screenshots/Phase-2.png" style="width: 60%;" />
---

## PHASE THREE: The End of the Beginning

In Phase Three I focused on tidying up the rules that govern (basic) movement, and also expanding the world beyond the borders of the display screen. This involved creating a new Columns object class to keep track of the individual blocks more easily, and to control the rendering/derendering of blocks as the player moves away from them, allowing the screen to follow the player as they traverse the world. Except for the starting screen, blocks are actually only generated when the player approaches them, and are then kept in the Column object's memory if the player leaves and then returns to them.

In this phase I also reorganized the game's file locations, made the game engine into its own object class, and added an intro/press any key (where's the any key??) screen so that the player can choose when to start. Minor improvements to the game's artwork were also incorporated in this stage. After this phase is complete it will be a matter of deciding what aspects to add next. The Top 3 condending options at this point are: Adding baddies, fighting, and the concept of death; improving and experimenting with the game's "physics", or introducing inventories/basic world manipulation. To add spice, these concepts will be developed in tandem with the game's level structure, with each successive feature having a 'level' built around it as a tutorial/to showcase the new feature.

## Incremental Goals:

1. Create Engine object class and rearrange the game's code to use it.

2. Have game wait on player action to start.

3. Make intro text object that loads before the game is visible and goes away when the any key is pressed.

4. Added new artwork with the help of Atack Artwork & Design Studios, who have their own graphics tablet:

---
<img src="assets/Screenshots/Phase-3-intro.png" style="width: 60%;" />
---

5. If the player moves to within a certain distance of the edge in either direction, several things must happen simultaneously:
A: All blocks in the farthest distant column are de-rendered;
B: Everything in the world shifts away from the direction the player moved in:
  * There is a horizontal offset value in the game engine
  * All blocks' rendering calculations include the horizontal offset, and blocks have a method to toggle their dom elements
  * The player's dom element is also offset horizontally, so your sprite is shifted away from the edge as the screen 'follows' you.
C: A new column is generated in front of the player, OR if the player is revisiting territory they moved away from, that column is re-rendered using the above-mentioned block dom toggle method.
D: Introduced new Columns object class to store blocks and make de/rendering them easier.
  * Columns object is called into existence as an attribute of the game engine.

6. Physics tweaks: You can't use the move right or move left methods more than once per game cycle and jumping makes you move up by 2 now instead of 1 since the game cycle is much faster. Better physics are on the to-do list for the near future.

7. Reassign world width global variable name to the width of the wider world, and reassign all values currently associated with that variable to 'screen width' since the world and the screen are no longer the same width.

8. Make the Columns object and the Engine (if applicable) use the new global world width variable in determining how many columns to generate.

9. Re-impose movement limitations on the player's movement and/or the screen scroll method so that both stop when you get to the edge of the wider world.

10. Crudely make some kind of level out of all this and make a mission for the player to touch both of the edges of the world. A console log message of congratulations is then proudly displayed!

# 11. Tidy up all of the level-making stuff into something cleaner (hint: object) and then remove all the console log signs except the one congratulating you for visiting the east/wester 'poles'. Also, add one for each separate pole so you can see your progress!

# 12. Save this stage and get to work on some actual homework!

## PHASE FOUR: The Mission object and the World Builder Suite!