const deviceServices = require('../services/devices');

const {
    expect
} = require('chai');

describe('Testing device service', () => {

    describe('Needs to say Hello', () => {

        const result = deviceServices.sayHello();

        expect(result).to.be.equal('Hello');
    });
});