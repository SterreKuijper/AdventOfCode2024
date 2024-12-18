import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day15.txt');

function findRobot(map: string[][], robot: string) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === robot) {
                return {x, y};
            }
        }
    }
}

function getDirection(move: string) {
    switch (move) {
        case '^':
            return {x: 0, y: -1};
        case 'v':
            return {x: 0, y: 1};
        case '<':
            return {x: -1, y: 0};
        case '>':
            return {x: 1, y: 0};
    }
}


function canMove(map: string[][], nextX: number, nextY: number, direction: { x: number; y: number }) {
    while (map[nextY][nextX] !== '.' || map[nextY][nextX] !== '#') {
        nextX += direction.x;
        nextY += direction.y;
        if (map[nextY][nextX] === '#') {
            return false;
        }
        if (map[nextY][nextX] === '.') {
            return true;
        }
    }
    return false;
}

function moveRobot(map: string[][], robotPosition: { x: number; y: number }, move: string) {
    let x = robotPosition.x;
    let y = robotPosition.y;
    let direction = getDirection(move)!;
    let nextX = x + direction.x;
    let nextY = y + direction.y;

    let newMap = map.map(line => line.slice());

    if (map[nextY][nextX] === '#') {
        return {newRobotPosition: {x, y}, newMap: newMap};
    } else if (map[nextY][nextX] === '.') {
        newMap[y][x] = '.';
        newMap[nextY][nextX] = '@';
        return {newRobotPosition: {x: nextX, y: nextY}, newMap: newMap};
    } else if (map[nextY][nextX] === 'O') {
        if (!canMove(map, nextX, nextY, direction)) {
            return {newRobotPosition: {x, y}, newMap: newMap};
        } else {
            newMap[y][x] = '.';
            newMap[nextY][nextX] = '@';
            while (map[nextY][nextX] === 'O') {
                nextX += direction.x;
                nextY += direction.y;
                newMap[nextY][nextX] = 'O';
            }
            return {newRobotPosition: {x: x + direction.x, y: y + direction.y}, newMap: newMap};
        }
    }
}

function partOne(input: string) {
    let lines = input.split('\n');
    let map = lines.splice(0, lines.findIndex(line => line === '\r')).map(line => line.trim().split(''))
    let moves = lines.splice(lines.findIndex(line => line === '\r') + 1, lines.length).map(line => line.trim().split('')).flat();

    let robotPosition = findRobot(map, '@')!;
    for (let move of moves) {
        const {newRobotPosition, newMap} = moveRobot(map, robotPosition, move)!;
        robotPosition = newRobotPosition;
        map = newMap;
    }

    let result = 0;
    for (let j = 1; j < map.length - 1; j++) {
        for (let i = 1; i < map[0].length - 1; i++) {
            if (map[j][i] === 'O') {
                result += i + j * 100;
            }
        }
    }
    return result;
}

function partTwo(input: string) {
    let result = 0;
    return result;
}

console.time('part1')
console.log('Part 1:', partOne(input));
console.timeEnd('part1')
console.time('part2')
console.log('Part 2:', partTwo(input));
console.timeEnd('part2')