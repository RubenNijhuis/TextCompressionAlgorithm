const HelperFunctions = require('./Helperfunctions');
const Node = require('./HuffmanNode');
const path = require('path');
const _ = require('lodash');
const _cliProgress = require('cli-progress');

const bar1 = new _cliProgress.SingleBar(
    {},
    _cliProgress.Presets.shades_classic,
);

class Tree {
    constructor(inputFile) {
        this.frequencies = this.findFrequencies(inputFile);
        this.root = this.constructTree(this.frequencies);
    }

    constructTree(frequencies) {
        while (frequencies.length > 1) {
            let leftNode = frequencies.shift();
            let rightNode = frequencies.shift();
            let totalFrequency = leftNode.frequency + rightNode.frequency;

            let newNode = new Node(totalFrequency, null, leftNode, rightNode);

            frequencies.unshift(newNode);
            frequencies = _.sortBy(Object.values(frequencies), ['frequency']);
        }

        return frequencies[0];
    }

    findFrequencies(values) {
        let nodes = new Array();
        let frequencies = _.groupBy(values);

        _.mapValues(frequencies, (valueList) =>
            nodes.push(new Node(valueList.length, valueList[0])),
        );
        nodes.reverse();

        return nodes;
    }

    returnTreeMap() {
        const jsonString = JSON.stringify(this.root, null, 2);
        HelperFunctions.writeFile('./map.json', jsonString);
        return jsonString;
    }

    encode(input, map) {
        let recipes = new Object();

        let binaryEncoding = input
            .split('')
            .map((character) => {
                if (recipes[character] != null) {
                    return recipes[character];
                } else {
                    let encodedCharacter = this.encodeCharacter(
                        character,
                        JSON.parse(map),
                        [],
                    );
                    recipes[character] = encodedCharacter;
                    return encodedCharacter;
                }
            })
            .join('');

        HelperFunctions.writeFile(
            path.join(process.cwd(), './encodedBinary.txt'),
            binaryEncoding,
        );
    }

    encodeCharacter(character, node, encodedBinaryArray) {
        // base case: we hit a leaf and there was no match
        if (node == null) {
            return null;
        }

        if (node.char == character) {
            return encodedBinaryArray.join('');
        }

        let leftSearch = this.encodeCharacter(
            character,
            node.left,
            encodedBinaryArray.concat(['0']),
        );

        if (leftSearch) {
            return leftSearch;
        }

        let rightSearch = this.encodeCharacter(
            character,
            node.right,
            encodedBinaryArray.concat(['1']),
        );

        if (rightSearch) {
            return rightSearch;
        }

        // we've hit a node with two dead ends, therefore the encoding is elsewhere on the tree.
        return null;
    }

    decode(binaryString, map) {
        let binaryArray = binaryString.split('');
        let outputArray = [];
        let currentNode = JSON.parse(map);
        let totalPercent = 1000;
        bar1.start(totalPercent, 0);

        for (let i = 0; i < binaryArray.length; i++) {
            if (currentNode.char != null) {
                outputArray.push(currentNode.char);
                currentNode = JSON.parse(map);
            }

            binaryArray[i] == '0'
                ? (currentNode = currentNode.left)
                : (currentNode = currentNode.right);
        }

        bar1.stop();

        let output = outputArray.join('');
        HelperFunctions.writeFile('./decodedFile.txt', output);
    }
}

module.exports = Tree;
