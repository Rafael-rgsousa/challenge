const deviceServices = require('../services/devices');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();


describe('Testing device service', () => {

    it('Needs to say Hello', (done) => {

        const result = deviceServices.sayHello();

        // result.should.have.status(200);
        result.should.be.a('string');
        done();
    });

    it('Needs to get the name of the first node', (done) => {

        chai.request(app)
            .get('/starting-node')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                done();
            });
    });

    it('Needs to get a list of paths beginning with a node', (done) => {

        chai.request(app)
        .get('/paths/SBZG')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('paths');
            res.body.paths.should.be.a('array');
            done();
        });
    });


    it('Needs to get the highest time beginning with a node', (done) => {

        chai.request(app)
        .get('/highest-time/SBZG')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('path');
            res.body.should.have.property('latency');
            res.body.latency.should.be.a('number');
            res.body.path.should.be.a('array');
            done();
        });
    });

    it('Needs to get the lowest time beginning with a node', (done) => {

        chai.request(app)
        .get('/lowest-time/SBZG')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('path');
            res.body.should.have.property('latency');
            res.body.latency.should.be.a('number');
            res.body.path.should.be.a('array');
            done();
        });
    });
});