const app = require('./config/expressConfig');

const port = process.env.PORT || 3000;


const swaggerJsdoc = require('swagger-jsdoc');

const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        // Like the one described here: https://swagger.io/specification/#infoObject
        info: {
            title: 'Bose Challenge - Backend',
            version: '1.0.0',
            description: 'Challenge to be a Backend developer at Bose',
        },
        basePath: '/',
    },
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./routes/devices.js'],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = app;