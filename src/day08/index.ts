import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day08.txt');

interface Antenna {
    frequency: string;
    position: number[];
}

function isInAntidotes(array: any[], element: any) {
    for (const el of array) {
        if (el[0] === element[0] && el[1] === element[1]) {
            return true;
        }
    }
    return false;
}

function isInMap(map: string[][], position: number[]) {
    return position[0] >= 0
        && position[0] < map.length
        && position[1] >= 0
        && position[1] < map[0].length;
}

function getNewAntidotesPositions(antenna1: any, antenna2: any) {
    const distance = [antenna2.position[0] - antenna1.position[0], antenna2.position[1] - antenna1.position[1]];
    const newAntidote1 = [antenna2.position[0] + distance[0], antenna2.position[1] + distance[1]];
    const newAntidote2 = [antenna1.position[0] - distance[0], antenna1.position[1] - distance[1]];
    return [newAntidote1, newAntidote2];
}

function partOne(input: string) {
    const map = input.split('\n').map(line => line.trim().split(''));
    const antennas: Antenna[] = [];
    map.forEach((line, x) => {
        line.forEach((char, y) => {
            if (char !== '.') {
                antennas.push({
                    frequency: char,
                    position: [x, y]
                });
            }
        })
    });
    const antidotes: string[][] = [];
    for (const antenna1 of antennas) {
        for (const antenna2 of antennas) {
            if (antenna1.frequency === antenna2.frequency && antenna1.position !== antenna2.position) {
                const newAntidotes = getNewAntidotesPositions(antenna1, antenna2);
                for (const newAntidote of newAntidotes) {
                    if (!isInAntidotes(antidotes, newAntidote) && isInMap(map, newAntidote)) {
                        antidotes.push(newAntidote);
                    }
                }
            }
        }
    }
    return antidotes.length;
}

function partTwo(input: string) {
    let result = 0;
    return result;
}

console.log('Part 1:', partOne(input));
console.log('Part 2:', partTwo(input));