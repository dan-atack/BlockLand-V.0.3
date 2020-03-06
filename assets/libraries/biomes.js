// Welcome to the Biomes Library!

// Here is where all the biomes are kept, at the moment in the form of a list of arrays.
// At the bottom we have a biomes object which is the index that holds all of the arrays with the actual biome blueprints.
// This way we can keep the biomes' names while still treating them as though they were in a list (so our randomizer can randomly grab them)
// NOTE: If we ever do jazz up the start screen it should be given a wierd number so it can't be chosen by the randomizer.

const startStage = [
    // first index position for each column is the BOTTOM row.
    // Block printer will render this pattern from left to right.
    // ZERO is a placeholder for, you guessed it, an empty block!
    [3, 1, 1, 2],    // column zero,
    [4, 3, 1, 5],       // column one...
    [4, 3, 1, 5],       // column two...
    [4, 3, 1, 1, 2],
    [4, 3, 3, 1, 0, 0, 1, 2],
    [4, 3, 3, 1, 0, 0, 1],
    [4, 3, 1, 1, 2],
    [4, 3, 1, 1, 2],
    [4, 3, 1, 2],    // column eight ... original start stage is nine columns wide, so we'll start with that.
];

const experimentalIceTrees = [
    // Tree blocks actually look decent too but the foliage blocks need some branches coming in from the bottom.
    // Food for future thought: background "connector" imgs placed relative to certain 'node' blocks to make cooler looking large formations.
    [3, 8, 6, 7],
    [3, 8, 6, 7],
    [3, 8, 6, 7],
    [3, 8, 6, 7],
    [3, 8, 6, 6, 7],
    [3, 8, 6, 7],
    [3, 8, 6, 7],
    [3, 8, 6, 6, 6, 7, 7],
    [3, 8, 6, 7],
];

const forestA = [
    [3, 1, 1, 2],
    [3, 1, 2, 6, 6, 7],
    [3, 1, 2],
    [3, 1, 2, 0, 0, 0, 7],
    [3, 1, 2, 6, 6, 7, 7, 7],
    [3, 1, 2, 0, 0, 0, 7],
    [3, 1, 2, 0, 7],
    [3, 1, 2, 6, 7, 7],
    [3, 1, 2, 0, 7],
];

const volcano = [
    [4, 3, 3, 2],
    [4, 3, 3, 2],
    [4, 3, 3, 3, 3, 2],
    [4, 4, 3, 3, 3, 3, 3, 3],
    [4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 3, 3, 3, 3, 3, 3],
    [4, 4, 3, 3, 3, 0, 7],
    [4, 3, 3, 2, 6, 7, 7],
    [4, 3, 1, 2, 0, 0, 7],
];

const shallowLake = [
    [3, 1, 1, 2],
    [3, 1, 1, 5],
    [3, 1, 1, 5],
    [3, 3, 1, 5],
    [3, 3, 1, 1, 2],
    [3, 3, 1, 1, 2],
    [3, 3, 1, 1, 2],
    [3, 1, 1, 5],
    [3, 1, 1, 5],
]

const biomes = {
    count: 5,
    biome00: startStage,
    biome01: experimentalIceTrees,
    biome02: forestA,
    biome03: volcano,
    biome04: shallowLake
};