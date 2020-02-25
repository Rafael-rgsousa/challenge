
const file = require('./file');

const sayHello = () => 'Hello';

const uploadFile = (file) => {

}

const getPathsNode = (node) => {};
const getHighestTime = (node) => {};
const getLowestTime = (node) => {};

const getStartingNode = async () => {
    return file.getFirstNode();
}

module.exports = {
    sayHello,
    uploadFile,
    getStartingNode,
    getPathsNode,
    getHighestTime,
    getLowestTime,
}