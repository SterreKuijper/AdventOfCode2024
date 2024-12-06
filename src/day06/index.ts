import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day06.txt');

function findGuard(grid: string[]) {
    const width = grid[0].length;
    const height = grid.length;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (grid[j][i] === '^') {
                return [i, j];
            }
        }
    }
    return [0, 0];
}

function getNextCoordinates(currentCoord: number[], direction: number[]) {
    return [currentCoord[0] + direction[0], currentCoord[1] + direction[1]];
}

function turnRight(direction: number[]) {
    const directions = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0]
    ];
    const index = directions.findIndex(dir => dir[0] === direction[0] && dir[1] === direction[1]);
    return directions[(index + 1) % 4];
}

function getPosition(grid: string[], coord: number[]) {
    if (coord[0] < 0 || coord[0] >= grid[0].length || coord[1] < 0 || coord[1] >= grid.length) return undefined;
    return grid[coord[1]][coord[0]];
}

function partOne(input: string) {
    let result = 1; // Includes guard's starting position
    const lines = input.split('\n');
    lines.forEach((line, index) => {
        lines[index] = line.trim()
    });

    let guardCoord = findGuard(lines);
    const directions = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0]
    ];
    let direction = directions[0];

    let guardLeftMap = false;

    let visited = [guardCoord];

    while (!guardLeftMap) {
        const nextCoord = getNextCoordinates(guardCoord, direction);
        const nextPosition = getPosition(lines, nextCoord);
        if (nextPosition === undefined) {
            guardLeftMap = true;
            break;
        } else {
            if (nextPosition === '#') {
                direction = turnRight(direction);
            } else {
                guardCoord = nextCoord;
                if (!visited.find(coord => coord[0] === nextCoord[0] && coord[1] === nextCoord[1])) {
                    visited.push(guardCoord);
                    result++;
                }
            }
        }
    }

    return result;
}

function partTwo(input: string) {
    let result = 0;
    return result;
}

console.log('Part 1:', partOne(input));
console.log('Part 2:', partTwo(input));