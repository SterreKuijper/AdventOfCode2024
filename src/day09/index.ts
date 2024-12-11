import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day09.txt');

function calculateChecksum(compactedFiles: number[]) {
    let checksum = 0;
    for (let i = 0; i < compactedFiles.length; i++) {
        if (compactedFiles[i] == -1) continue;
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
            if (element == undefined) continue;
            else compactedFiles.push(element)
        }
        if (index >= freeSpaceLengths.length) break;
        for (let i = 0; i < freeSpaceLengths[index]; i++) {
            compactedFiles.push(-1)
        }
        index++;
    }
    index = compactedFiles.length - 1;
    let currentFileIndex = compactedFiles[compactedFiles.length - 1];

    while (index > 0) {
        //find the first file that has the index of the currentFileIndex
        if (compactedFiles[index] == currentFileIndex) {
            //find how many are there in the block
            let blockLength = 1;
            while (compactedFiles[index - blockLength] == currentFileIndex) {
                blockLength++;
            }
            //see if there is free memory space for this block
            let i = 0;
            while (i < index) {
                if (compactedFiles[i] == -1) {
                    let freeSpaceLength = 1;
                    while (compactedFiles[i + freeSpaceLength] == -1) {
                        freeSpaceLength++;
                    }
                    if (freeSpaceLength >= blockLength) {
                        //move the block to the free memory space
                        for (let j = 0; j < blockLength; j++) {
                            compactedFiles[i + j] = currentFileIndex;
                        }
                        //replace the block with -1
                        for (let j = 0; j < blockLength; j++) {
                            compactedFiles[index - j] = -1;
                        }
                        break;
                    }
                }
                i++;
            }
            currentFileIndex--;
        }
        index--;
    }
    return calculateChecksum(compactedFiles);
}

console.log('Part 1:', partOne(input));
console.log('Part 2:', partTwo(input));