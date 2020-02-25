const multer = require('multer');
const uuidv3 = require('uuid/v3');
const path = require('path');

const RESOURCES_PATH = './resources';

/**
 * @description Make a randon string
 * @param {Number} lenght Lenght of string
 * @returns {String}
 */
const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

/**
 * @description Make a internal and unique name to the new file
 * @returns {String}
 */
const defineNewFileName = (filename) => {
    const name = `${uuidv3(makeid(10), uuidv3.URL)}.${filename.split('.').pop()}`;
    return name;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(RESOURCES_PATH));
    },
    filename: (req, file, cb) => {
        // const name = defineNewFileName(file.filename || file.originalname);
        const name = 'network.txt';
        // eslint-disable-next-line no-param-reassign
        file.filename = name;
        // eslint-disable-next-line no-param-reassign
        file.originalname = name;
        // cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
        cb(null, name);
    },
});

const upload = multer({
    storage,
});

module.exports = {
    storage,
    upload,
};