
function calculateDistance(a: number[], b: number[]): number {
    a.sort();
    b.sort();
    let result: number = 0;
    for (let i = 0; i < a.length; i++) {
        result += Math.abs(a[i] - b[i]);
    }
    return result;
}

function getInput(file: string) :[number[], number[]] {
    const fs = require('fs');
    const input = fs.readFileSync(file, 'utf8');

    const list1 = [];
    const list2 = [];

    for (const line of input.split('\n')) {
        const [a, b] = line.split(/\s+/);
        list1.push(a);
        list2.push(b);
    }

    return [list1, list2];
}

const input = getInput("input.txt");

console.log(calculateDistance(input[0], input[1])); // 3