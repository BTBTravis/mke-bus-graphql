// TODO: add express server test here
import sinon from 'sinon';
import chai from 'chai';
const expect = chai.expect;

import supertest from 'supertest';
import createServer from '../lib/shell';


describe('GraphQL Server MODULE', function () {
  let server;
  beforeEach(function () {
    server = createServer();
  });
  afterEach(function () {
    server.close();
  });
  it('graphiql endpoint returns 200', () => {
    return supertest(server)
      .get('/graphiql')
      .expect(200);
  });
  it('serverTimes', () => {
    return supertest(server)
      .post('/graphql')
      .send({
        query: `query {
          serverTimes {
            graphqlServer
            MCTSRealTime
          }
        }`
      })
      .expect(200)
      .then(res => {
        res = res.body.data;
        expect(res.serverTimes.graphqlServer).to.be.a('number');
        expect(res.serverTimes.MCTSRealTime).to.be.a('number');
        expect(res.serverTimes.MCTSRealTime.toString().length).to.equal(10);
        expect(res.serverTimes.graphqlServer.toString().length).to.equal(10);
      });
  });
});

