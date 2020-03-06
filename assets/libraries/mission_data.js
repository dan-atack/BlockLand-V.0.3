// This is the Library for miss

// Note: The missions library will contain an array of Mission Data, which will be the fodder for the creation of 
// mission objects when the game Engine needs to create them. Each object's array should follow the format to create
// this kind of object. Is this DRY as a bone, or what?

// const mission =
// {
//     missionNumber: 1,
//     difficulty: "easy",
//     brief: "Following the creation of the world, the Designer thought it a good idea to walk to both edges of the world to see if they exist."
//     objective_1: ["Reach the Rightmost Edge of the world.", "position", [25], 1],
//     objective_2: ["Reach the Leftmost Edge of the world.", "position", [-25], 1]
// }
//

const missions = [
    // That order again: level number, difficulty, briefing statement, and then a list of arrays which will become objectives:
    [0, "tutorial", "Following the creation of the world, the Designer thought it a good idea to walk to both edges of the world to see if they exist.", [["Reach the Rightmost Edge of the world.", "position", [25], 1], ["Reach the Leftmost Edge of the world.", "position", [-25], 1]]]
]