const express = require('express'),
    app = express(),
    cors = require('cors');

app.use(cors());

require('../routes/devices')(app);

app.get(`/ping`, (req, res) => res.send('pong'));

app.use('*', (req, res) => {
    const message = `${req.originalUrl} not found`;
    console.log(message);
    res.statusMessage = message;
    res.status(404).send(message).end();
});

module.exports = app;