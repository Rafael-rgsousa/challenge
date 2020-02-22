const BASE_PATH = '/devices';

module.exports = app => {
    app.get(`${BASE_PATH}/ping`, (req, res) => res.send('pong'));
}