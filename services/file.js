const fs = require('fs'), // file api on NodeJs
    es = require('event-stream'), // facilite to work with stream
    path = require('path'); // facilite to resolve paths on node js

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
                    networkRelationship.map((item, index) => item.position = index);
                    resolve(networkRelationship);
                })
            )
    });
}


/**
 * 
 * @param {*} node 
 * @param {*} network 
 */
const findNodeOnNetwork = (node, network) =>
    network.map((item, i) => item.origin === node ? i : -1)
    .filter(index => index !== -1);


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
 * @description get network from file
 * @returns { Array } network representation
 */
const getNetworkFromFile = async (filePath) => {

    // get network representation from file
    return await readFile(path.resolve(filePath));
}


/**
 * @description Get the name of the first node of the network
 * @private false
 * @returns { String }
 */
const getFirstNode = async (networkRelationship) => {
    // const networkRelationship = await getNetworkFromFile(FILE_PATH);

    const firstNode = _getFirstNode(0, networkRelationship);

    return firstNode;

}

/**
 * 
 * @param {*} node 
 * @param {*} network 
 */
const getNodeChildren = (node, network) => network.filter((x) => x.origin === node.origin);

/**
 * 
 * @param {*} nodeName 
 * @param {*} network 
 */
const getNextPathByNodeName = (nodeName, network) => {

    const nodefilter = findNodeOnNetwork(nodeName, network);

    const node = network[nodefilter[0]];

    let childrenNodes = [];

    const nodeResult = {
        origin: node.origin || '',
        target: node.target || '',
        latency: node.latency || -1,
        path: childrenNodes
    }

    if (!node) {
        return nodeResult;
    }

    if (node.target) {

        const childrenResult = getNodeChildren(node, network);

        nodeChildren = childrenResult;
    }


    nodeChildren.map((childrenItem) => {
        nodeResult.path.map((item) => {
            if (childrenItem.target === item.target && childrenItem.origin === item.origin) {
                item.path = getNextPathByNodeName(item.target, network) || [];

            }
        })
    });

    return nodeResult;
}


/**
 * 
 * @param {*} nodeName 
 * @param {*} network 
 */
const makePathByNode = (nodeName, network) => {


    const nodefilter = findNodeOnNetwork(nodeName, network);

    const node = network[nodefilter[0]];

    if (!node) {

        return {
            origin: nodeName,
            // target: ,
            latency: 0,
            path: []
        };

    }

    const nodeChildren = getNodeChildren(node, network) // getNextPathByNodeName(node.target, network);


    let nodeResult = {
        origin: node.origin,
        target: node.target,
        latency: node.latency,
        path: nodeChildren
    }

    if (!nodeChildren || nodeChildren.length <= 0) {

        return {
            origin: nodeName,
            // target: ,
            latency: 0,
            path: []
        };
    }

    if (nodeResult && nodeResult.path && Array.isArray(nodeResult.path)) {

        nodeResult.path.map((item) => {
            makePathByNode(item.target, network);
        })
    }


    return nodeResult;
}


const getPathFromNode = (node, networkRelationship) => {

    if (!node) {
        const first = getFirstNode(networkRelationship);
        node = first.origin;
    }

    const result = makePathByNode(node, networkRelationship);

    return result;
}

/**
 * 
 * @param {*} total 
 * @param {*} node 
 */
const countLatency = (total, node) => {
    return total += (node.latency);
}


/**
 * 
 * @param {*} result 
 * @param {*} network 
 */
const getDeepPathFromNode = (result, network) => {

    if (!result.path) {

        resultPathList.push(result.origin);
        return {
            origin: result.origin,
            // target: ,
            latency: 0,
        };

    }

    // deep children identification
    result.path.map((item) => {
        if (item.target) {
            const itemPathResult = getPathFromNode(item.target, network);

            item.path = itemPathResult.path;

            if (!item.path) {
                return {
                    origin: result.origin,
                    latency: 0,
                };

            }

            item.path.map((itemPosition) => {
                if (itemPosition.target) {
                    const itemPositionResult = getPathFromNode(itemPosition.target, network);
                    itemPathResult.path.map((newItemPosition) => {
                        if (!newItemPosition.path) {
                            const newItemPositionResult = getPathFromNode(newItemPosition.target, network);
                            newItemPosition.path = newItemPositionResult.path;
                        }
                    });

                    itemPosition.path = itemPositionResult.path;
                    getDeepPathFromNode(itemPositionResult, network);

                }
            });
        }
    });

    return result;
}


/**
 * @description flat node tree
 * @param {node} param0 
 */
const flatMap = ({
    origin,
    path = []
}) => [origin].concat(...path.map(flatMap));


/**
 * @description flat node tree by Latency
 * @param {node} param0 
 */
const flatMapByLatency = ({
    latency,
    path = []
}) => [latency].concat(...path.map(flatMapByLatency));


/**
 * 
 * @param {*} node 
 * @param {*} network 
 */
const makeNodeTree = (node = null, network) => {

    if (!node) {
        const first = getFirstNode(network);
        node = first.origin;
    }


    result = getPathFromNode(node, network);

    const firstLevel = result.path;

    const aggregatedResult = [];


    firstLevel.map((item) => {

        let pathLatency = item.latency;

        let positonResult = getPathFromNode(item.target, network);

        // get node path latency
        pathLatency += positonResult.path.reduce(countLatency, 0);

        // get all children of the first node
        positonResult = getDeepPathFromNode(positonResult, network);

        // make an array with one dimesion of nodes of the path
        const flatedArray = flatMap(positonResult);

        // make the result
        aggregatedResult.push({
            latency: pathLatency,
            path: [...new Set(flatedArray)]
        });
    });

    return {
        starting_node: node,
        paths: aggregatedResult
    }

}


/**
 * 
 * @param {*} nodeName 
 */
const getPathByNode = async (nodeName) => {

    // get data from file
    const networkRelationship = await getNetworkFromFile(FILE_PATH);

    // get paths
    const nodePath = makeNodeTree(nodeName, networkRelationship);

    return nodePath;
}



/**
 * 
 * @param {*} nodeName 
 */
const getHighestTime = async (nodeName) => {

    // get the data from file
    const networkRelationship = await getNetworkFromFile(FILE_PATH);

    // make the tree from the node
    const nodePath = makeNodeTree(nodeName, networkRelationship, false);

    // sort DESC by latency valye
    nodePath.paths.sort((a, b) => (a.latency < b.latency) ? 1 : ((b.latency < a.latency) ? -1 : 0));

    // get selected node
    const selectedNode = nodePath.paths[0];

    return {
        latency: selectedNode.latency,
        path: selectedNode.path
    }
}

/**
 * 
 * @param {*} nodeName 
 */
const getLowestTime = async (nodeName) => {

    // get the data from file
    const networkRelationship = await getNetworkFromFile(FILE_PATH);

    // make tree from the node
    const nodePath = makeNodeTree(nodeName, networkRelationship, false);

    // sort ASC by latency valye
    nodePath.paths.sort((a, b) => (a.latency > b.latency) ? 1 : ((b.latency > a.latency) ? -1 : 0));

    // get selected node
    const selectedNode = nodePath.paths[0];

    return {
        latency: selectedNode.latency,
        path: selectedNode.path
    }
}

/**
 * 
 */
const getStartingNode = async () => {

    // ge tthe data from the file
    const networkRelationship = await getNetworkFromFile(FILE_PATH);

    // get the first node
    const result = getFirstNode(networkRelationship);

    return result;
}


module.exports = {
    getStartingNode,
    getPathByNode,
    getHighestTime,
    getLowestTime
};