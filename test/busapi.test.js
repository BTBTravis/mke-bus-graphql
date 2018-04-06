require('dotenv').load();
import sinon from 'sinon';
import chai from 'chai';
const expect = chai.expect;

import createBusAPI from '../lib/busapi';

import axios from 'axios';
import xml2js from 'xml2js';
import moment from 'moment';

let createFakeServices = (res) => {
  let services = {
    axios: {
      create: sinon.stub().returns({
        get: sinon.stub().resolves({data: res})
      })
    },
    parseString: xml2js.parseString,
    moment: moment
  }
  return services;
};
let realServices = {
  axios: axios,
  parseString: xml2js.parseString,
  moment: moment
}

describe('MCTS API MODULE', function () {
  //let fakeServices = createFakeServices();
  //let fakebusAPI = createBusAPI(fakeServices)();
  let realbusAPI = createBusAPI(realServices)();

  let isVehicle = (x) => {
    expect(x).to.have.property('vid');
    expect(x).to.have.property('tmstmp');
    // check tmstmp is a unix time
    expect(x.tmstmp).to.be.an('number');
    expect(x.tmstmp.toString().length).to.equal(10);
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
  };

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
        isVehicle(x);
      });
    });
  });
  it('getVehiclesByRoute with number', () => {
    return realbusAPI.getVehiclesByRoute(23)
    .then(res => {
      expect(res).to.be.an('array');
      res.map(x => {
        isVehicle(x);
      });
    });
  });
  it('getVehiclesByVID with number', () => {
    let fakeRes = `<?xml version="1.0"?>
      <bustime-response>
          <vehicle>
              <vid>5325</vid>
              <tmstmp>20180405 20:56</tmstmp>
              <lat>43.02327414921352</lat>
              <lon>-87.91263171604702</lon>
              <hdg>27</hdg>
              <pid>9919</pid>
              <rt>23</rt>
              <des>Granville/Calumet</des>
              <pdist>25689</pdist>
              <spd>17</spd>
              <tablockid>23 -352</tablockid>
              <tatripid>3817</tatripid>
              <zone></zone>
          </vehicle>
      </bustime-response>`;
    let fakeServices = createFakeServices(fakeRes);
    let fakebusAPI = createBusAPI(fakeServices)();
    return fakebusAPI.getVehiclesByVID(5325)
    .then(res => {
      expect(res).to.be.an('array');
      res.map(x => {
        isVehicle(x);
      });
    });
  });
  it('getVehiclesByVID with array', () => {
    let fakeRes = `<?xml version="1.0"?>
      <bustime-response>
          <vehicle>
              <vid>5325</vid>
              <tmstmp>20180405 20:56</tmstmp>
              <lat>43.02327414921352</lat>
              <lon>-87.91263171604702</lon>
              <hdg>27</hdg>
              <pid>9919</pid>
              <rt>23</rt>
              <des>Granville/Calumet</des>
              <pdist>25689</pdist>
              <spd>17</spd>
              <tablockid>23 -352</tablockid>
              <tatripid>3817</tatripid>
              <zone></zone>
          </vehicle>
          <vehicle>
              <vid>5339</vid>
              <tmstmp>20180405 21:13</tmstmp>
              <lat>43.14875504464814</lat>
              <lon>-88.02830019864169</lon>
              <hdg>289</hdg>
              <pid>9919</pid>
              <rt>23</rt>
              <des>Granville/Calumet</des>
              <pdist>95494</pdist>
              <spd>12</spd>
              <tablockid>23 -304</tablockid>
              <tatripid>3815</tatripid>
              <zone></zone>
          </vehicle>
      </bustime-response>`;
    let fakeServices = createFakeServices(fakeRes);
    let fakebusAPI = createBusAPI(fakeServices)();
    return fakebusAPI.getVehiclesByVID([5339, 5325])
    .then(res => {
      expect(res).to.be.an('array');
      res.map(x => {
        isVehicle(x);
      });
    });
  });
  it('getDirectionsByRoute with rt', () => {
    return realbusAPI.getDirectionsByRoute(23)
    .then(res => {
      expect(res).to.be.an('array');
      res.map(x => {
        expect(x).to.be.an('string');
      });
    });
  });
  it('getStopsByRoute with rt & dir', () => {
    return realbusAPI.getStopsByRoute(23, 'NORTH')
    .then(res => {
      expect(res).to.be.an('array');
      res.map(x => {
        expect(x).to.have.property('stpid');
        expect(x).to.have.property('lat');
        expect(x).to.have.property('lon');
        expect(x).to.have.property('stpnm');
      });
    });
  });

});

