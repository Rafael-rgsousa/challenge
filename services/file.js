const fs = require('fs'), // file api on NodeJs
    es = require('event-stream'), // facilite to work with stream
    path = require('path'), // facilite to resolve paths on node js
    _ = require('lodash'); // super tool to work in nodejs

const FILE_PATH = './resources/network.txt';

/**
 * @description This method work with file lazy loading and can work with big files
 * The method read line by line clean the RAM after finish reading each line 
 */
const readFile = async (filePath) => {

    const networkRelationship = [];
    return new Promise((resolve, reject) => {
        fs
            .createReadStream(filePath)
            .pipe(es.split()) //split stream to break on newlines
            .pipe(
                es.mapSync((line) => { //turn this async function into a stream

                    // get origin element
                    const firstPartLineSplitContent = line.split('->');

                    // get target element and latency size
                    const secondPartLineSplitContent = firstPartLineSplitContent[1].split(' ');

                    // create an object representing the line
                    networkRelationship.push({
                        origin: firstPartLineSplitContent[0], // device 'father' of this device
                        target: secondPartLineSplitContent[0], // device 'child' of this device
                        latency: Number(secondPartLineSplitContent[1])
                    });

                })
                .on('error', (err) => {
                    reject(err);
                })
                .on('end', () => {

                    console.log('Read entire file.');
                    // sort by target
                    networkRelationship.sort((a, b) => (a.target > b.target) ? 1 : ((b.target > a.target) ? -1 : 0));
                    resolve(networkRelationship);
                })
            )
    });
}

/**
 * @description Get first node
 * @param {*} node 
 * @param {*} network 
 * @returns a node from network
 * @private true
 */
const _getFirstNode = (nodePositon, network) => {

    const node = network[nodePositon];

    // It looks for the node that doens't have a 'father' or 'origin'. 
    const filteredNetwork = network.filter((item) => item.target === node.origin);

    // veirfy if the filterResult has origin
    if (!filteredNetwork || filteredNetwork.length <= 0) {
        return node; // node found
    }

    // try again
    return _getFirstNode(nodePositon + 1, network);
}

/**
 * @description Get the name of the first node of the network
 * @private false
 * @returns { String }
 */
const getFirstNode = async () => {
    const networkRelationship = await getNetworkFromFile(FILE_PATH);

    const firstNode = _getFirstNode(0, networkRelationship);

    return firstNode;

}

/**
 * @description get network from file
 * @returns { Array } network representation
 */
const getNetworkFromFile = async (filePath) => {

    // get network representation from file
    return await readFile(path.resolve(filePath));

}

/**
 *  @description It
 */
const makeNetworkRepresentaiton = async () => {

    // get network relationship from file
    const networkRelationship = await getNetworkFromFile(FILE_PATH);

    const firstNode = _getFirstNode(0, networkRelationship);

    const b = firstNode;
}



// makeNetworkRepresentaiton();

module.exports = {
    makeNetworkRepresentaiton,
    getFirstNode,
};