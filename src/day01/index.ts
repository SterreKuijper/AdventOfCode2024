import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day01.txt');

function partOne(input: string) {
    let result = 0;

    const list1: number[] = [];
    const list2: number[] = [];

    for (const line of input.split('\n')) {
        const [a, b] = line.split(/\s+/);
        list1.push(parseInt(a));
        list2.push(parseInt(b));
    }

    list1.sort();
    list2.sort();
    for (let i = 0; i < list1.length; i++) {
        result += Math.abs(list1[i] - list2[i]);
    }

    return result;
}

function partTwo(input: string) {
    let result = 0;

    const list1: number[] = [];
    const list2: number[] = [];

    for (const line of input.split('\n')) {
        const [a, b] = line.split(/\s+/);
        list1.push(parseInt(a));
        list2.push(parseInt(b));
    }

    list1.sort();
    list2.sort();

    for (let i = 0; i < list1.length; i++) {
        let count = 0;
        for (let j = 0; j < list2.length; j++) {
            if (list1[i] === list2[j]) {
                count++;
            }
        }
        count *= list1[i];
        result += count;
    }

    return result;
}

console.log('Part 1:', partOne(input));
console.log('Part 2:', partTwo(input));