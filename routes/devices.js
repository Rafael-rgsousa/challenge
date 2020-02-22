const BASE_PATH = '/devices';

const devicesServices = require('../services/devices');

module.exports = app => {
    app.get(`${BASE_PATH}/hello`, (req, res) => devicesServices.sayHello(req, res));
}