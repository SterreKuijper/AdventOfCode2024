import {utils} from "../utils/utils";

const input = utils('../inputs/day04.txt');

function getNeighbours(line: number, char: number, width: number, height: number) {
    let neighbours = [];

    if (line > 0) {
        neighbours.push([line - 1, char]); // top
        if (char < width - 1) {
            neighbours.push([line - 1, char + 1]); // top right
        }
    }
    if (char < width - 1) {
        neighbours.push([line, char + 1]); // right
        if (line < height - 1) {
            neighbours.push([line + 1, char + 1]); // bottom right
        }
    }
    if (line < height - 1) {
        neighbours.push([line + 1, char]); // bottom
        if (char > 0) {
            neighbours.push([line + 1, char - 1]); // bottom left
        }
    }
    if (char > 0) {
        neighbours.push([line, char - 1]); // left
        if (line > 0) {
            neighbours.push([line - 1, char - 1]); // top left
        }
    }

    return neighbours;
}

function nextXmasChar(char1: number[], char2: number[]) {
    let nextChar = [];

    if (char1[0] === char2[0]) nextChar[0] = char1[0];
    else if (char1[0] > char2[0]) nextChar[0] = char2[0] - 1;
    else if (char1[0] < char2[0]) nextChar[0] = char2[0] + 1;

    if (char1[1] === char2[1]) nextChar[1] = char1[1];
    else if (char1[1] > char2[1]) nextChar[1] = char2[1] - 1;
    else if (char1[1] < char2[1]) nextChar[1] = char2[1] + 1;

    return nextChar;
}

function isValidChar(line: number, char: number, lines: string[]) {
    return line >= 0 && line < lines.length && char >= 0 && char < lines[line].length;
}

function partOne(input: string) {
    let result = 0;

    let lines = input.split('\n');

    lines.forEach((line, indexLine) => {
        Array.from(line).forEach((char, indexChar) => {
            if (char === 'X') {
                for (let neighbour of getNeighbours(indexLine, indexChar, line.length, lines.length)) {
                    if (lines[neighbour[0]][neighbour[1]] === 'M') {
                        let nextNeighbour = nextXmasChar([indexLine, indexChar], neighbour);
                        if (isValidChar(nextNeighbour[0], nextNeighbour[1], lines) && lines[nextNeighbour[0]][nextNeighbour[1]] === 'A') {
                            nextNeighbour = nextXmasChar(neighbour, nextNeighbour);
                            if (isValidChar(nextNeighbour[0], nextNeighbour[1], lines) && lines[nextNeighbour[0]][nextNeighbour[1]] === 'S') {
                                result++;
                            }
                        }
                    }
                }
            }
        });
    });

    return result;
}

// M M   M
//  A   MAS
// S S   S

function isXMAS(char1: number[], char2: number[], lines: string[]) {
    let nextM = [];
    let nextS = [];
    if (char1[0] === char2[0]) {
        nextM = [char1[0] - 1, char1[1]];
        nextS = [char1[0] + 1, char1[1]];
        if (isValidXMAS(nextM, nextS, lines) && (char2[0] !== nextS[0] || char2[1] !== nextS[1])) return true;

        nextM = [char1[0] + 1, char1[1]];
        nextS = [char1[0] - 1, char1[1]];
        if (isValidXMAS(nextM, nextS, lines) && (char2[0] !== nextS[0] || char2[1] !== nextS[1])) return true;
    } else if (char1[1] === char2[1]) {
        nextM = [char1[0], char1[1] - 1];
        nextS = [char1[0], char1[1] + 1];
        if (isValidXMAS(nextM, nextS, lines) && (char2[0] !== nextS[0] || char2[1] !== nextS[1])) return true;

        nextM = [char1[0], char1[1] + 1];
        nextS = [char1[0], char1[1] - 1];
        if (isValidXMAS(nextM, nextS, lines) && (char2[0] !== nextS[0] || char2[1] !== nextS[1])) return true;
    }
    else if ((char1[0] > char2[0] && char1[1] > char2[1]) || (char1[0] < char2[0] && char1[1] < char2[1])) {
        nextM = [char1[0] - 1, char1[1] + 1];
        nextS = [char1[0] + 1, char1[1] - 1];
        if (isValidXMAS(nextM, nextS, lines) && (char2[0] !== nextS[0] || char2[1] !== nextS[1])) return true;

        nextM = [char1[0] + 1, char1[1] - 1];
        nextS = [char1[0] - 1, char1[1] + 1];
        if (isValidXMAS(nextM, nextS, lines) && (char2[0] !== nextS[0] || char2[1] !== nextS[1])) return true;
    }
    else if ((char1[0] < char2[0] && char1[1] > char2[1] || (char1[0] > char2[0] && char1[1] < char2[1]))) {
        nextM = [char1[0] - 1, char1[1] - 1];
        nextS = [char1[0] + 1, char1[1] + 1];
        if (isValidXMAS(nextM, nextS, lines) && (char2[0] !== nextS[0] || char2[1] !== nextS[1])) return true;

        nextM = [char1[0] + 1, char1[1] + 1];
        nextS = [char1[0] - 1, char1[1] - 1];
        if (isValidXMAS(nextM, nextS, lines) && (char2[0] !== nextS[0] || char2[1] !== nextS[1])) return true;
    }
    return false;
}

function isValidXMAS(nextM: number[], nextS: number[], lines: string[]) {
    return isValidChar(nextM[0], nextM[1], lines)
        && isValidChar(nextS[0], nextS[1], lines)
        && lines[nextM[0]][nextM[1]] === 'M'
        && lines[nextS[0]][nextS[1]] === 'S'
}

function partTwo(input: string) {
    let result = 0;

    let lines = input.split('\n');

    lines.forEach((line, indexLine) => {
        Array.from(line).forEach((char, indexChar) => {
            if (char === 'M') {
                for (let neighbour of getNeighbours(indexLine, indexChar, line.length, lines.length)) {
                    if (lines[neighbour[0]][neighbour[1]] === 'A') {
                        let nextNeighbour = nextXmasChar([indexLine, indexChar], neighbour);
                        if (isValidChar(nextNeighbour[0], nextNeighbour[1], lines) && lines[nextNeighbour[0]][nextNeighbour[1]] === 'S') {
                            if (isXMAS(neighbour, nextNeighbour, lines)) result++;
                        }
                    }
                }
            }
        });
    });

    return result/2;
}

console.log('Part 1:', partOne(input));
console.log('Part 2:', partTwo(input));