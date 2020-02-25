const BASE_PATH = '/devices';

const devicesServices = require('../services/devices');

const multer = require('../config/multer');

module.exports = app => {

    /**
     * @swagger
     * /devices/hello:
     *   get:
     *     description: It a endpoint to test application
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: message
     *         schema:
     *           type: object
     */
    app.get(`${BASE_PATH}/hello`, (req, res) => {

        try {

            const response = devicesServices.sayHello();
            res.json({
                message: response
            });

        } catch (err) {
            res.status(500).json(err);
            throw new Error('Failed to say Hello', err);
        }
    });


    /**
     * @swagger
     * /starting-node:
     *   get:
     *     description: Get the name of the first node
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: node name
     *         schema:
     *           type: object
     */
    app.get('/starting-node', async (req, res) => {

        try {

            const firstNode = await devicesServices.getStartingNode();

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

    /**
     * @swagger
     * /network:
     *   put:
     *     description: Upload a new Network 
     *     consumes:
     *      - application/x-www-form-urlencoded
     *     schema:
     *      type: object
     *     parameters:
     *      - in: formData
     *        name: file
     *        type: file
     *        description: The file to upload.
     *     responses:
     *       200:
     *         description: status
     *         schema:
     *           type: object
     */
    app.put('/network', multer.upload.single('file'), async (req, res) => {

        try {

            const file = req.file;

            if (file && file.filename) {
                res.json({
                    status: 'success'
                });
            }

        } catch (err) {

            const errorMessage = 'Failed to upload file';
            res.status(500).json({
                message: errorMessage
            });

            throw new Error(errorMessage, err);
        }

    });


    /**
     * @swagger
     * /paths/{node}:
     *   get:
     *     description: Get the path beggining on the passed node
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: node name
     *         schema:
     *           type: object
     */
    app.get('/paths/:node', (req, res) => {

        try {

            const bal = req;

        } catch (err) {

            const errorMessage = 'Failed to get paths from node';
            res.status(500).json({
                message: errorMessage
            });

            throw new Error(errorMessage, err);
        }
    });


    /**
     * @swagger
     * /paths:
     *   get:
     *     description: Get the path beggining from the first node
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: node name
     *         schema:
     *           type: object
     */
    app.get('/paths', (req, res) => {

        try {

            const bal = req;

        } catch (err) {

            const errorMessage = 'Failed to get paths from node';
            res.status(500).json({
                message: errorMessage
            });

            throw new Error(errorMessage, err);
        }
    });



    /**
     * @swagger
     * /highest-time/{node}:
     *   get:
     *     description: Get the path beggining on the passed node
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: node name
     *         schema:
     *           type: object
     */
    app.get('/highest-time/:node', (req, res) => {

        try {

        } catch (err) {

            const errorMessage = 'Failed to get paths from node';
            res.status(500).json({
                message: errorMessage
            });

            throw new Error(errorMessage, err);
        }
    });




    /**
     * @swagger
     * /highest-time:
     *   get:
     *     description: Get the path beggining on the first node
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: node name
     *         schema:
     *           type: object
     */
    app.get('/highest-time', (req, res) => {

        try {

        } catch (err) {

            const errorMessage = 'Failed to get paths from node';
            res.status(500).json({
                message: errorMessage
            });

            throw new Error(errorMessage, err);
        }
    });


    /**
     * @swagger
     * /lowest-time/{node}:
     *   get:
     *     description: Get the path beggining on the first node
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: node name
     *         schema:
     *           type: object
     */
    app.get('/lowest-time/:node', (req, res) => {

        try {

        } catch (err) {

            const errorMessage = 'Failed to get paths from node';
            res.status(500).json({
                message: errorMessage
            });

            throw new Error(errorMessage, err);
        }
    });


    /**
     * @swagger
     * /lowest-time:
     *   get:
     *     description: Get the path beggining on the first node
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: node name
     *         schema:
     *           type: object
     */
    app.get('/lowest-time', (req, res) => {

        try {

        } catch (err) {

            const errorMessage = 'Failed to get paths from node';
            res.status(500).json({
                message: errorMessage
            });

            throw new Error(errorMessage, err);
        }
    });


}