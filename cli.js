#!/usr/bin/env node
const path = require('path');

const Tree = require('./HuffmanCode/HuffmanTree');
const HelperFunctions = require('./HuffmanCode/HelperFunctions');

let HuffmanTree;

if (process.argv[2] === 'encode') {
    if (process.argv[3] == null) {
        console.error('NEED TO PROVIDE INPUT FILE!');
    } else {
        const inputFile = HelperFunctions.readFile(
            path.join(process.cwd(), process.argv[3]),
        );

        HuffmanTree = new Tree(inputFile);
        HuffmanTree.encode(inputFile, HuffmanTree.returnTreeMap());
    }
} else if (process.argv[2] === 'decode') {
    if (process.argv[3] == null) {
        console.error('NEED TO PROVIDE INPUT FILE!');
    } else if (process.argv[4] == null) {
        console.error('NEED TO PROVIDE MAP FILE! (JSON)');
    } else {
        const inputFile = HelperFunctions.readFile(
            path.join(process.cwd(), process.argv[3]),
        );

        const inputMap = HelperFunctions.readFile(
            path.join(process.cwd(), process.argv[4]),
        );

        HuffmanTree = new Tree();
        HuffmanTree.decode(inputFile, inputMap);
    }
}
