import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day11.txt');

function removeLeadingZeroes(numStr: string): string {
    return numStr.replace(/^0+/, '') || '0';
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
                firstHalf = removeLeadingZeroes(firstHalf);
                secondHalf = removeLeadingZeroes(secondHalf);
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

function partTwo(input: string): number {
    let stoneFrequency = new Map<number, number>(); // Map to track frequency of each stone

    // Initialize frequency map with input
    input.split(' ').map(Number).forEach(stone => {
        stoneFrequency.set(stone, (stoneFrequency.get(stone) || 0) + 1);
    });

    for (let i = 0; i < 75; i++) {
        const newFrequency = new Map<number, number>(); // Map for next iteration

        for (const [stone, count] of stoneFrequency.entries()) {
            if (stone === 0) {
                // Replace 0 with 1
                newFrequency.set(1, (newFrequency.get(1) || 0) + count);
            } else if (stone.toString().length % 2 === 0) {
                // Split even-length numbers into halves
                let stoneStr = stone.toString();
                let firstHalf = Number(removeLeadingZeroes(stoneStr.slice(0, stoneStr.length / 2)));
                let secondHalf = Number(removeLeadingZeroes(stoneStr.slice(stoneStr.length / 2)));
                newFrequency.set(firstHalf, (newFrequency.get(firstHalf) || 0) + count);
                newFrequency.set(secondHalf, (newFrequency.get(secondHalf) || 0) + count);
            } else {
                // Multiply odd-length numbers by 2024
                let newStone = stone * 2024;
                newFrequency.set(newStone, (newFrequency.get(newStone) || 0) + count);
            }
        }

        // Replace old frequency map with the new one
        stoneFrequency = newFrequency;
    }

    // Sum all frequencies to get the total count of stones
    let totalStones = 0;
    for (const count of stoneFrequency.values()) {
        totalStones += count;
    }

    return totalStones;
}


console.log('Part 1:', partOne(input));
console.log('Part 2:', partTwo(input));