import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day03.txt');

function mul(a: number, b: number) {
    return a * b;
}

function partOne(input: string) {
    let result = 0;

    const pattern = /mul\(\s*([\d,]+)\s*\)/g;

    for (let line of input.split('\n')) {
        const matches = line.matchAll(pattern);
        for (const match of matches) {
            const numbers = match[1].trim().split(',').map(Number);
            if (numbers.length == 2) result += mul(numbers[0], numbers[1]);
        }
    }

    return result;
}

function partTwo(input: string) {
    let result = 0;

    const pattern = /mul\(\s*([\d,]+)\s*\)|do\(\)|don't\(\)/g;
    let enabled = true;

    for (let line of input.split('\n')) {
        const matches = line.matchAll(pattern);

        for (const match of matches) {
            if (match[0] == 'do()') enabled = true;
            else if (match[0] == "don't()") enabled = false;
            else {
                const numbers = match[1].trim().split(',').map(Number);
                if (numbers.length == 2 && enabled) result += mul(numbers[0], numbers[1]);
            }
        }
    }

    return result;
}

console.log('Part 1:', partOne(input));
console.log('Part 2:', partTwo(input));