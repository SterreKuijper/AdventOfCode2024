import {readFile} from "../utils/readFile";
import {getNeighbours} from "../utils/getNeighbours";

const input = readFile('../inputs/day12.txt');


function getSides(fences: number[][]) {
    // x, y, 0: horizontal, 1: vertical
    const sides = []
    for (const fence of fences) {
        const orientation = fence[2];
        const dictionary: { [key: number]: number[][] } = {}; // An empty dictionary

        for (let i = 0; i < 4; i++) {
            if (orientation === i) {
                let sameCoordinate;
                let oppositeCoordinate;

                if (i === 0 || i === 2) {
                    sameCoordinate = 1;
                    oppositeCoordinate = 0;
                } else {
                    sameCoordinate = 0;
                    oppositeCoordinate = 1;
                }

                const sameOrientation = fences.filter(f => f[2] === i);
                for (const same of sameOrientation) {
                    if (!dictionary[same[sameCoordinate]]) {
                        dictionary[same[sameCoordinate]] = []; // Initialize if key doesn't exist
                    }
                    dictionary[same[sameCoordinate]].push(same);
                }

                for (const key in dictionary) {
                    dictionary[key].sort((a, b) => a[oppositeCoordinate] - b[oppositeCoordinate]);
                    let group = [dictionary[key][0]]; // Initialize group with the first element
                    for (let i = 1; i < dictionary[key].length; i++) {
                        if (dictionary[key][i][oppositeCoordinate] - dictionary[key][i - 1][oppositeCoordinate] === 1) {
                            group.push(dictionary[key][i]);
                        } else {
                            fences = fences.filter(f => !group.includes(f));
                            sides.push(group);
                            group = [dictionary[key][i]];
                        }
                    }
                    fences = fences.filter(f => !group.includes(f));
                    sides.push(group);
                }
            }
        }
    }
    return sides.length;
}

function getAllNeighbours(x: number, y: number, map: string[][]) {
    const neighbors = [];

    if (y > 0) neighbors.push([x, y - 1, 0]);
    else neighbors.push([x, -1, 0]);

    if (x < map[0].length - 1) neighbors.push([x + 1, y, 1]);
    else neighbors.push([map[0].length, y, 1]);

    if (y < map.length - 1) neighbors.push([x, y + 1, 2]);
    else neighbors.push([x, map.length, 2]);

    if (x > 0) neighbors.push([x - 1, y, 3]);
    else neighbors.push([-1, y, 3]);

    return neighbors;
}

function countSidesAndPlots(plot: number[], map: string[][]) {
    let plots = 0;

    let fences = []

    let currentPlots = [plot]
    let allNeighboursAreDiscovered = false;

    while (!allNeighboursAreDiscovered) {
        allNeighboursAreDiscovered = true;
        const newCurrentPlots: number[][] = [];

        for (const currentPlot of currentPlots) {
            plots++;
            const x = currentPlot[0];
            const y = currentPlot[1];
            const plant = map[y][x];
            map[y][x] = '#';

            const neighbours = getAllNeighbours(x, y, map);

            for (const neighbour of neighbours) {
                if (neighbour[0] === -1 || neighbour[0] === map[0].length
                    || neighbour[1] === -1 || neighbour[1] === map.length) {
                    fences.push(neighbour)
                    continue;
                }
                const neighbourPlant = map[neighbour[1]][neighbour[0]];
                if (neighbourPlant === plant && !newCurrentPlots.some(([x, y]) => x === neighbour[0] && y === neighbour[1])) {
                    allNeighboursAreDiscovered = false;
                    newCurrentPlots.push([neighbour[0], neighbour[1]]);
                } else if (neighbourPlant !== '#' && neighbourPlant !== plant) {
                    fences.push(neighbour)
                }
            }
        }
        currentPlots = newCurrentPlots;
    }
    map.forEach((row, j) => row.forEach((cell, i) => {
        if (cell === '#') {
            map[j][i] = '@';
        }
    }));

    return {fences, plots};
}

function countFencesAndPlots(plot: number[], map: string[][]) {
    let fences = 0;
    let plots = 0;

    let currentPlots = [plot]
    let allNeighboursAreDiscovered = false;

    while (!allNeighboursAreDiscovered) {
        allNeighboursAreDiscovered = true;
        const newCurrentPlots: number[][] = [];

        for (const currentPlot of currentPlots) {
            plots++;
            const x = currentPlot[0];
            const y = currentPlot[1];
            const plant = map[y][x];
            map[y][x] = '#';

            const neighbours = getNeighbours(x, y, map);
            while (neighbours.length < 4) neighbours.push([-1]);

            for (const neighbour of neighbours) {
                if (neighbour[0] === -1) {
                    fences++;
                    continue;
                }
                const neighbourPlant = map[neighbour[1]][neighbour[0]];
                if (neighbourPlant === plant && !newCurrentPlots.some(([x, y]) => x === neighbour[0] && y === neighbour[1])) {
                    allNeighboursAreDiscovered = false;
                    newCurrentPlots.push([neighbour[0], neighbour[1]]);
                } else if (neighbourPlant !== '#' && neighbourPlant !== plant) {
                    fences++;
                }
            }
        }
        currentPlots = newCurrentPlots;
    }
    map.forEach((row, j) => row.forEach((cell, i) => {
        if (cell === '#') {
            map[j][i] = '@';
        }
    }));
    return {fences, plots};
}

function partOne(input: string) {
    let result = 0;
    const map = input.split('\n').map(line => line.trim().split(''));

    for (let j = 0; j < map.length; j++) {
        for (let i = 0; i < map[0].length; i++) {
            const plant = map[j][i];
            if (plant !== '@') {
                const {fences, plots} = countFencesAndPlots([i, j], map);
                result += fences * plots;
            }
        }
    }

    return result;
}

function partTwo(input: string) {
    let result = 0;
    const map = input.split('\n').map(line => line.trim().split(''));

    for (let j = 0; j < map.length; j++) {
        for (let i = 0; i < map[0].length; i++) {
            const plant = map[j][i];
            if (plant !== '@') {
                const {fences, plots} = countSidesAndPlots([i, j], map);
                const sides = getSides(fences);
                result += sides * plots;
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