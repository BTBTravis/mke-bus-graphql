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
  it('getVehiclesByRoute with array', () => {
    return realbusAPI.getVehiclesByRoute([23, 30])
    .then(res => {
      expect(res).to.be.an('array');
      res.map(x => {
        expect(x).to.have.property('vid');
        expect(x).to.have.property('tmstmp');
        expect(x).to.have.property('lat');
        expect(x).to.have.property('lon');
        expect(x).to.have.property('hdg');
        expect(x).to.have.property('pid');
        expect(x).to.have.property('rt');
        expect(x).to.have.property('des');
        expect(x).to.have.property('pdist');
        expect(x).to.have.property('spd');
        expect(x).to.have.property('tablockid');
        expect(x).to.have.property('tatripid');
        expect(x).to.have.property('zone');
      });
    });
  });
  it('getVehiclesByRoute with number', () => {
    return realbusAPI.getVehiclesByRoute(23)
    .then(res => {
      expect(res).to.be.an('array');
      res.map(x => {
        expect(x).to.have.property('vid');
        expect(x).to.have.property('tmstmp');
        expect(x).to.have.property('lat');
        expect(x).to.have.property('lon');
        expect(x).to.have.property('hdg');
        expect(x).to.have.property('pid');
        expect(x).to.have.property('rt');
        expect(x).to.have.property('des');
        expect(x).to.have.property('pdist');
        expect(x).to.have.property('spd');
        expect(x).to.have.property('tablockid');
        expect(x).to.have.property('tatripid');
        expect(x).to.have.property('zone');
      });
    });
  });
});
