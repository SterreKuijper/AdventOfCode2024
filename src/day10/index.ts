import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day10.txt');

function isInArray(element:any, array:any[]) {
    for (const el of array) {
        if (el[0] === element[0] && el[1] === element[1]) {
            return true;
        }
    }
    return false;
}

function getNeighbors(position: number[], map: number[][]) {
    const x = position[0];
    const y = position[1];
    const neighbors = [];
    if (x > 0) neighbors.push({position: [x - 1, y], value: map[x - 1][y]});
    if (y < map[0].length - 1) neighbors.push({position: [x, y + 1], value: map[x][y + 1]});
    if (x < map.length - 1) neighbors.push({position: [x + 1, y], value: map[x + 1][y]});
    if (y > 0) neighbors.push({position: [x, y - 1], value: map[x][y - 1]});
    return neighbors;
}

function recursion(checkValue: number, position: number[], map: number[][]): string {
    let cell = map[position[1]][position[0]];
    let result: string ='';
    if (cell === 9 && checkValue === 9) {
        return position[0] + ',' + position[1] + ';'
    } else if (cell === checkValue) {
        let neighbors = getNeighbors(position, map);
        for (const neighbor of neighbors) {
            let recursionResult = recursion(checkValue + 1, neighbor.position, map);
            if (recursionResult) {
                result += recursionResult;
            }
        }
        return result;
    } else {
        return '';
    }
}

function partOne(input: string) {
    const topographicMap = input.split('\n').map(row => row.trim().split('').map(cell => parseInt(cell)));
    // console.table(topographicMap);
    let result = 0;

    // loop over the map
    for (let i = 0; i < topographicMap.length; i++) {
        for (let j = 0; j < topographicMap[i].length; j++) {
            const cellPosition = [j, i];
            let recursionResult = recursion(0, cellPosition, topographicMap);
            if (recursionResult) {
                console.log('recursionResult:', recursionResult);
                let ninePositions: number[][] = [];
                let pairs = recursionResult.trim().split(';');
                for (let pair of pairs) {
                    let position = pair.split(',');
                    let newPosition = [parseInt(position[0]), parseInt(position[1])];
                    if (pair && !isInArray(newPosition, ninePositions)) {
                        result++;
                        ninePositions.push(newPosition);
                    }
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