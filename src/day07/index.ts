import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day07.txt');

function partOne(input: string) {
    let result = 0;

    // get the data from the input
    const calibrations = [];
    for (const line of input.split('\n')) {
        const split = line.split(': ');
        const calibration = {
            testValue: parseInt(split[0]),
            equation: split[1].split(' ').map(digit => parseInt(digit)),
        }
        calibrations.push(calibration);
    }

    // check if the test value is in the possible sums
    for (const calibration of calibrations) {
        const equation = calibration.equation;
        let possibleSums: number[] = [];
        equation.forEach((digit, index) => {
            if (index === 0) {
                possibleSums.push(digit);
            } else {
                possibleSums.forEach((sum, sumIndex) => {
                    possibleSums[sumIndex] = sum + digit;
                    possibleSums.push(sum * digit);
                });
            }
        });

        // if the test value is in the possible sums, add it to the result
        if (possibleSums.includes(calibration.testValue)) {
            result += calibration.testValue;
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