const deviceServices = require('../services/devices');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();


describe('Testing device service', () => {

    it('Needs to say Hello', (done) => {

        const result = deviceServices.sayHello();

        chai.expect(result).to.be.equal('Hello');
        done();
    });

    it ('Needs to get the name of the first node', (done) => {

            chai.request(app)
                .get('/starting-node')
                .end((err, res) => {
             
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    done();
                })
        });
});