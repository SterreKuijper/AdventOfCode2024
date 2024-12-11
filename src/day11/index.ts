import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day11.txt');

function removeLeadingZeroes(num: number) {
    let numStr = num.toString();
    while (numStr[0] == '0') {
        numStr = numStr.slice(1);
    }
    if (numStr == '') return '0';
    return numStr;
}

function partOne(input: string) {
    let stones = input.split(' ').map(Number);
    for (let i = 0; i < 25; i++) {
        for (let index = 0; index < stones.length; index++) {
            let stone = stones[index];
            if (stone == 0) stones[index] = 1;
            else if (stone.toString().length % 2 == 0) {
                let stoneStr = stone.toString();
                let firstHalf = stoneStr.slice(0, stoneStr.length / 2);
                let secondHalf = stoneStr.slice(stoneStr.length / 2);
                firstHalf = removeLeadingZeroes(Number(firstHalf));
                secondHalf = removeLeadingZeroes(Number(secondHalf));
                stones[index] = Number(firstHalf);
                stones.splice(index + 1, 0, Number(secondHalf));
                index++
            } else {
                stones[index] = stone * 2024;
            }
        }
    }
    return stones.length;
}

function partTwo(input: string) {
    let result = 0;
    return result;
}

console.log('Part 1:', partOne(input));
console.log('Part 2:', partTwo(input));