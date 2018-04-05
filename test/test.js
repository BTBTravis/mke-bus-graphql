require('dotenv').load();
import sinon from 'sinon';
import chai from 'chai';
const expect = chai.expect;

import createBusAPI from '../lib/busapi';

import axios from 'axios';
import xml2js from 'xml2js';
import moment from 'moment';

let createFakeServices = () => {
  let services = {
    axios: {
      create: sinon.stub().returns({
        get: sinon.stub().resolves({data: 'test'})
      })
    },
    console: {
      log: sinon.stub()
    },
  }
  return services;
};
let realServices = {
  axios: axios,
  parseString: xml2js.parseString,
  moment: moment
}

describe('MCTS API MODULE', function () {
  let fakeServices = createFakeServices();
  let fakebusAPI = createBusAPI(fakeServices)();
  let realbusAPI = createBusAPI(realServices)();

  it('getTime', () => {
    return realbusAPI.getTime()
    .then(res => {
      expect(res).to.be.an('number');
      expect(res.toString().length).to.equal(10);
    });
  });
  it('getRoutes', () => {
    return realbusAPI.getRoutes()
    .then(res => {
      expect(res).to.be.an('array');
      res.map(x => {
        expect(x).to.have.property('rt');
        expect(x).to.have.property('rtnm');
        expect(x).to.have.property('rtdd');
      });
    });
  });

});
