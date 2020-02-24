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


    app.get('/starting-node', async (req, res) => {

        try {

            const firstNode = await devicesServices.getFirstNode();

            res.json({
                name: firstNode.origin || ''
            });

        } catch (err) {

            const errorMessage = 'Failed to get the first node';
            res.status(500).json({
                message: errorMessage
            });

            throw new Error(errorMessage, err);
        }
    });
}