import {utils} from "../utils/utils";

const input = utils('../inputs/day02.txt');

function partOne(input: string) {
    let result = 0;

    for (const line of input.split('\n')) {
        const numbers = line.split(' ');
        let safe = true;

        const increase = parseInt(numbers[1]) - parseInt(numbers[0]);

        for (let i = 1; i < numbers.length; i++) {
            const difference = parseInt(numbers[i]) - parseInt(numbers[i - 1]);

            const variance = Math.abs(difference)
            safe = variance >= 1 && variance <= 3;

            if ((difference > 0 && increase < 0) || (difference < 0 && increase > 0)) {
                safe = false;
            }

            if (!safe) break;
        }

        if (safe) result++;
    }
    return result;
}

function partTwo(input: string) {
    let result = 0;

    for (const line of input.split('\n')) {
        if (partOne(line) > 0) {
            result++;
        } else {
            const numbers = line.split(' ');
            for (let i = 0; i < numbers.length; i++) {
                const newNumbers = numbers.filter((item, index) => index !== i);
                let numberString = '';
                for (const number of newNumbers) {
                    numberString += number;
                    numberString += ' ';
                }
                numberString = numberString.trim();

                if (partOne(numberString) > 0) {
                    result++;
                    break;
                }
            }
        }
    }


    return result;
}

console.log('Part 1:', partOne(input));
console.log('Part 2:', partTwo(input));