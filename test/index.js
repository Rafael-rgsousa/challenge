
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');


chai.use(chaiHttp);
chai.should();

describe('Test', () => {

    it('We should get a response equals pong', (done) => {

        chai.request(app)
        .get('/ping')
        .end((err, res)=> {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.text.should.be.string('pong');
            done();
        });
    });
});