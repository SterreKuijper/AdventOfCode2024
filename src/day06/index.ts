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

function findInArray(array: number[][], element: number[]) {
    return array.find(el => el[0] === element[0] && el[1] === element[1]);
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
    // create the map
    const map = input.split('\n');
    map.forEach((line, index) => {
        map[index] = line.trim()
    });

    // get the guard starting position
    let guardStartCoord = findGuard(map);

    // create the direction orientation
    const directions = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0]
    ];
    let startDirection = directions[0];

    // loop over the map
    // to try out all the possible paths
    const width = map[0].length;
    const height = map.length;
    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            // if the current position is empty an obstacle can be placed
            if (map[j][i] === '.') {
                // create a deep copy of the map to place the obstacle
                let cloneMap = structuredClone(map);
                cloneMap[j] = cloneMap[j].substring(0, i) + '#' + cloneMap[j].substring(i + 1);

                // starting coordinates for the guard
                let guardCoord = guardStartCoord;
                let direction = startDirection;
                let visited = [guardCoord];
                let alreadyVisited = [guardCoord];

                while (true) {
                    const nextCoord = getNextCoordinates(guardCoord, direction);
                    const nextPosition = getPosition(cloneMap, nextCoord);
                    if (nextPosition === undefined) {
                        break;
                    } else {
                        if (nextPosition === '#') {
                            direction = turnRight(direction);
                        } else {
                            if (!findInArray(visited, nextCoord)) {
                                visited.push(nextCoord);
                                alreadyVisited = [guardStartCoord, nextCoord];
                            } else {
                                alreadyVisited.push(nextCoord);
                                if (alreadyVisited.length > 100) {
                                    result++;
                                    break;
                                }
                            }
                            guardCoord = nextCoord;
                        }
                    }
                }
            }
        }
    }
    return result;
}
console.time('part1')
console.log('Part 1:', partOne(input));
console.timeEnd('part1')
console.time('part2')
console.log('Part 2:', partTwo(input));
console.timeEnd('part2')