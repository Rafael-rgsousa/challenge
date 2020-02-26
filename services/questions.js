const fileService = require('./file');

const fs = require('fs');

const  path = require('path');

const questions = ['What was the token used to generate the network file?', 'What is the name of starting node?', 'What are the paths in the network and their respective travel time?',
    'What is the path with more hops?', 'What is the path with the biggest travel time?', 'What is the path with the shortest travel time?', 'How will you API perform if the file that describes the network has 1GB. And 10GB?',
    'What documentation did you consult to accomplish your assignment?', 'How much time did you spent developing your assignment?', 'If you had unlimited time, what would you do differently?'
];

/**
 * 
 * @param {*} item 
 */
const getAnswersActions = (item) => {
    const answersQuestionSwitch = {
        1: () => fileService.getStartingNode(),
        2: () => fileService.getStartingNode(),
        3: () => fileService.getPathByNode(),
        4: () => 'working in progress',
        5: () => fileService.getHighestTime(),
        6: () => fileService.getLowestTime(),
        7: () => `I'm using a file system module that works with huge file. It will works well but the time will be longer`,
        8: () => [{
                description: 'Stream File system',
                url: 'https://www.npmjs.com/package/event-stream',
            },
            {
                description: 'Swagger Specification',
                url: 'https://swagger.io/',
            },
            {
                description: 'Chai - BDD/TDD assertion for node',
                url: 'https://www.npmjs.com/package/chai',
            },
            {
                description: 'Mocha - Javascript test framwork',
                url: 'https://www.npmjs.com/package/mocha',
            },
            {
                description: 'Express - Frameowk to make application server with Node JS',
                url: 'https://www.npmjs.com/package/express',
            }
        ],
        9: () => 'About 20 hours',
        10: () => [
            'Refactory and use more Ramda (https://www.npmjs.com/package/ramda) to use more FP on javascript',
            'Refactory the methods that make the Deep path from the node',
        ]
    }

    return answersQuestionSwitch[item];
}

/**
 * 
 * @param {*} name 
 */
const readFile = async () => {
    // const path = `${__dirname}/resources/${name}.json`;

    const filePath = path.resolve('./resources/answers.json');

    const result = await fs.readFileSync(filePath, 'utf8');

    return JSON.parse(result);
};

/**
 * 
 */
const answer = async () => {

    const result = await readFile('answers');

    return result;
}

module.exports = {
    answer
}