import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day09.txt');

function calculateChecksum(compactedFiles: number[]) {
    let checksum = 0;
    for (let i = 0; i < compactedFiles.length; i++) {
        checksum += compactedFiles[i] * i
    }
    return checksum;
}

function getFiles(files: number[]) {
    let filesArray = []
    for (let i = 0; i < files.length; i++) {
        for (let j = 0; j < files[i]; j++) {
            filesArray.push(i)
        }
    }
    return filesArray
}

function partOne(input: string) {
    const fileLengths: number[] = []
    const freeSpaceLengths: number[] = []
    for (let i = 0; i < input.length; i++) {
        if (i % 2 == 0) fileLengths.push(Number(input[i]))
        else freeSpaceLengths.push(Number(input[i]))
    }

    const fileArray = getFiles(fileLengths);
    let compactedFiles: number[] = []
    let index = 0;
    while (fileArray.length > 0) {
        for (let i = 0; i < fileLengths[index]; i++) {
            let element = fileArray.shift();
            if (element == undefined) break;
            else compactedFiles.push(element)
        }
        for (let i = 0; i < freeSpaceLengths[index]; i++) {
            let element = fileArray.pop();
            if (element == undefined) break;
            else compactedFiles.push(element)
        }
        index++;
    }
    return calculateChecksum(compactedFiles);
}

function partTwo(input: string) {
    let result = 0;
    return result;
}

console.log('Part 1:', partOne(input));
console.log('Part 2:', partTwo(input));