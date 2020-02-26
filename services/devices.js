const file = require('./file');

const sayHello = () => 'Hello';

/**
 * 
 * @param {*} node 
 */
const getPathsNode = (node) => {
    return file.getPathByNode(node);
};

/**
 * 
 * @param {*} node 
 */
const getHighestTime = (node) => {
    return file.getHighestTime(node);
};

/**
 * 
 * @param {*} node 
 */
const getLowestTime = (node) => {
    return file.getLowestTime(node);
};

/**
 * 
 */
const getStartingNode = async () => {
    return file.getStartingNode();
}

module.exports = {
    sayHello,
    getStartingNode,
    getPathsNode,
    getHighestTime,
    getLowestTime,
}