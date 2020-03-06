let ray = {};

for (let i = 1; i < 5; i++) {
    ray[`idx${i}`] = [];
}

let x = 3

ray[`idx${x}`].push([1,2]);

console.log(ray.idx3);