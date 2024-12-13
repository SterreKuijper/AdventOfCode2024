import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day13.txt');

interface Machine {
    buttonA: {
        x: number,
        y: number
    },
    buttonB: {
        x: number,
        y: number
    },
    prize: {
        x: number,
        y: number
    }
}

function getPrizeCosts(machine: Machine) {
    let lowestCosts = 0;
    let prizeLocation = machine.prize;
    let buttonA = machine.buttonA;
    let buttonB = machine.buttonB;

    for (let a = 0; a < 100; a++) {
        for (let b = 0; b < 100; b++) {
            let costs = 0;
            let x = a * buttonA.x + b * buttonB.x;
            let y = a * buttonA.y + b * buttonB.y;
            if (x === prizeLocation.x && y === prizeLocation.y) {
                costs = 3 * a + b;
                if (lowestCosts === 0 || costs < lowestCosts) {
                    lowestCosts = costs;
                }
            }
        }
    }

    return lowestCosts;
}

function partOne(input: string) {
    const lines = input.split('\n')
    const machinesText = lines.reduce((machineGroups, line) => {
            if (line === '\r') machineGroups.push([]); // Start a new group
            else machineGroups[machineGroups.length - 1]?.push(line.trim()); // Add to the last group
            return machineGroups;
        },
        [[]] as string[][]).filter(group => group.length > 0);

    const machines: Machine[] = [];
    for (const machineText of machinesText) {
        const buttonA = machineText[0];
        const buttonB = machineText[1];
        const prize = machineText[2];

        const machine: Machine = {
            buttonA: {
                x: parseInt(buttonA.split(' ')[2].substring(buttonA.indexOf('X+') + 1, 2)),
                y: parseInt(buttonA.split(' ')[3].substring(buttonA.indexOf('Y+') + 1, 2))
            },
            buttonB: {
                x: parseInt(buttonB.split(' ')[2].substring(buttonB.indexOf('X+') + 1, 2)),
                y: parseInt(buttonB.split(' ')[3].substring(buttonB.indexOf('Y+') + 1, 2))
            },
            prize: {
                x: parseInt(prize.split(' ')[1].substring(prize.indexOf('X=') + 1, 2)),
                y: parseInt(prize.split(' ')[2].substring(prize.indexOf('Y=') + 1, 2))
            }
        }
        machines.push(machine);
    }

    let result = 0;
    for (const machine of machines) {
        result += getPrizeCosts(machine);
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