import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day14.txt');

interface Robot {
    position: {
        x: any,
        y: any
    },
    velocity: {
        x: any,
        y: any
    }
}

function christmasRow(grid: number[], width: number) {
    let row = 0;
    let isNextTo = false;
    for (let x = 0; x < width; x++) {
        if (grid[x] === 1 && (row === 0 || isNextTo)) {
            row++;
            isNextTo = true;
        } else if (row > 1) {
            break;
        } else {
            isNextTo = false;
            row = 0;
        }
    }
    return row;
}

function isChristmasTree(grid: number[][], width: number, height: number) {
    let treeRow = 1;
    for (let y = 0; y < height; y++) {
        let newRow = christmasRow(grid[y], width);
        if (newRow == treeRow + 2) {
            treeRow = newRow;
        }
    }
    return treeRow >= 7;
}

function fixOutOfBounds(robot: Robot, width: number, height: number) {
    if (robot.position.x < 0) robot.position.x += width;
    if (robot.position.x >= width) robot.position.x -= width;
    if (robot.position.y < 0) robot.position.y += height;
    if (robot.position.y >= height) robot.position.y -= height;
}

function partOne(input: string) {
    const width = 101;
    const height = 103;
    const seconds = 100;
    const robots: Robot[] = [];
    const lines = input.split('\n');
    for (let line of lines) {
        const lineSplit = line.trim().split(' ');
        const position = lineSplit[0].substring(lineSplit[0].indexOf('p=') + 2).split(',');
        const velocity = lineSplit[1].substring(lineSplit[1].indexOf('v=') + 2).split(',');

        const robot: Robot = {
            position: {
                x: parseInt(position[0]),
                y: parseInt(position[1])
            },
            velocity: {
                x: parseInt(velocity[0]),
                y: parseInt(velocity[1])
            }
        }
        robots.push(robot);
    }

    for (let second = 0; second < seconds; second++) {
        for (let robot of robots) {
            robot.position.x += robot.velocity.x;
            robot.position.y += robot.velocity.y;
            fixOutOfBounds(robot, width, height);
        }
    }

    let quadrants: any[] = [0, 0, 0, 0];

    let quadrantWidth = Math.floor(width / 2);
    let quadrantHeight = Math.floor(height / 2);

    for (let robot of robots) {
        if (robot.position.x < quadrantWidth && robot.position.y < quadrantHeight) {
            quadrants[0] += 1
        } else if (robot.position.x > quadrantWidth && robot.position.y < quadrantHeight) {
            quadrants[1] += 1
        } else if (robot.position.x < quadrantWidth && robot.position.y > quadrantHeight) {
            quadrants[2] += 1
        } else if (robot.position.x > quadrantWidth && robot.position.y > quadrantHeight) {
            quadrants[3] += 1
        }
    }

    let result = 1;
    for (let quadrant of quadrants) {
        result *= quadrant;
    }
    return result;
}

function partTwo(input: string) {
    const width = 101;
    const height = 103;
    const seconds = 10000;
    const robots: Robot[] = [];
    const lines = input.split('\n');
    for (let line of lines) {
        const lineSplit = line.trim().split(' ');
        const position = lineSplit[0].substring(lineSplit[0].indexOf('p=') + 2).split(',');
        const velocity = lineSplit[1].substring(lineSplit[1].indexOf('v=') + 2).split(',');

        const robot: Robot = {
            position: {
                x: parseInt(position[0]),
                y: parseInt(position[1])
            },
            velocity: {
                x: parseInt(velocity[0]),
                y: parseInt(velocity[1])
            }
        }
        robots.push(robot);
    }

    for (let second = 0; second < seconds; second++) {
        const grid = new Array(height).fill(0).map(() => new Array(width).fill(0));
        for (let robot of robots) {
            robot.position.x += robot.velocity.x;
            robot.position.y += robot.velocity.y;
            fixOutOfBounds(robot, width, height);
            grid[robot.position.y][robot.position.x] = 1;

            if (isChristmasTree(grid, width, height)) {
                return second + 1;
            }
        }
    }
}

console.time('part1')
console.log('Part 1:', partOne(input));
console.timeEnd('part1')
console.time('part2')
console.log('Part 2:', partTwo(input));
console.timeEnd('part2')