const deviceServices = require('../services/devices');

const {
    expect
} = require('chai');

describe('Testing device service', () => {

    it('Needs to say Hello', (done) => {

        const result = deviceServices.sayHello();

        expect(result).to.be.equal('Hello');
        done();
    });
});