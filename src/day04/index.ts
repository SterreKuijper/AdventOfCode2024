import {utils} from "../utils/utils";

const input = utils('../inputs/day04.txt');

function isEqualChar(char1: number[], char2: number[]) {
    return char1[0] === char2[0] && char1[1] === char2[1];
}

function isValidChar(line: number, char: number, lines: string[]) {
    return line >= 0 && line < lines.length && char >= 0 && char < lines[line].length;
}

function getChar(char: number[], lines: string[]): string {
    return lines[char[0]][char[1]];
}

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

function getDiagonals(line: number, char: number, width: number, height: number) {
    let diagonals = [];

    if (line > 0 && char > 0) {
        diagonals.push([line - 1, char - 1]); // top left
    }
    if (line > 0 && char < width - 1) {
        diagonals.push([line - 1, char + 1]); // top right
    }
    if (line < height - 1 && char < width - 1) {
        diagonals.push([line + 1, char + 1]); // bottom right
    }
    if (line < height - 1 && char > 0) {
        diagonals.push([line + 1, char - 1]); // bottom left
    }

    return diagonals;
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

function isXMAS(char1: number[], char2: number[], lines: string[]) {
    const diagonals = getDiagonals(char1[0], char1[1], lines[char1[0]].length, lines.length);
    if (diagonals.length !== 4) return false;
    const indexChar2 = diagonals.findIndex(diagonal => isEqualChar(diagonal, char2))

    if (indexChar2 < 0) return false;

    const opposite1 = diagonals[(indexChar2 + 1) % diagonals.length];
    const opposite2 = diagonals[(indexChar2 + 3) % diagonals.length];

    const charOpposite1 = getChar(opposite1, lines);
    const charOpposite2 = getChar(opposite2, lines);

    return (charOpposite1 === 'M' && charOpposite2 === 'S') || (charOpposite1 === 'S' && charOpposite2 === 'M');
}

function partOne(input: string) {
    let result = 0;

    let lines = input.split('\n');

    lines.forEach((line, indexLine) => {
        Array.from(line).forEach((char, indexChar) => {
            if (char === 'X') {
                for (let neighbour of getNeighbours(indexLine, indexChar, line.length, lines.length)) {
                    if (getChar(neighbour, lines) === 'M') {
                        let nextNeighbour = nextXmasChar([indexLine, indexChar], neighbour);
                        if (isValidChar(nextNeighbour[0], nextNeighbour[1], lines) && getChar(nextNeighbour, lines) === 'A') {
                            nextNeighbour = nextXmasChar(neighbour, nextNeighbour);
                            if (isValidChar(nextNeighbour[0], nextNeighbour[1], lines) && getChar(nextNeighbour, lines) === 'S') {
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

function partTwo(input: string) {
    let result = 0;

    let lines = input.split('\n');

    lines.forEach((line, indexLine) => {
        Array.from(line).forEach((char, indexChar) => {
            if (char === 'M') {
                for (let neighbour of getNeighbours(indexLine, indexChar, line.length, lines.length)) {
                    if (getChar(neighbour, lines) === 'A') {
                        let nextNeighbour = nextXmasChar([indexLine, indexChar], neighbour);
                        if (isValidChar(nextNeighbour[0], nextNeighbour[1], lines) && getChar(nextNeighbour, lines) === 'S') {
                            if (isXMAS(neighbour, nextNeighbour, lines)) result++;
                        }
                    }
                }
            }
        });
    });

    return result / 2;
}

console.log('Part 1:', partOne(input));
console.log('Part 2:', partTwo(input));