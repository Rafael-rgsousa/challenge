const BASE_PATH = '/devices';

const devicesServices = require('../services/devices');

module.exports = app => {
    app.get(`${BASE_PATH}/hello`, (req, res) => {

        try {

            const response = devicesServices.sayHello();
            res.send(response);

        } catch (err) {
            res.status(500).json(err);
            throw new Error('Failed to say Hello', err);
        }
    });
}