import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
import { makeExecutableSchema } from 'graphql-tools';
import axios from 'axios';
import xml2js from 'xml2js';
import moment from 'moment';
import createBusAPI from './busapi';
import createSchema from './schema';

export default () => {
  let busAPIServices = {
    axios: axios,
    parseString: xml2js.parseString,
    moment: moment
  };
  let busAPI = createBusAPI(busAPIServices)();
  let schemaServices = {
    makeExecutableSchema: makeExecutableSchema,
    busAPI: busAPI
  };
  let schema = createSchema(schemaServices)();
  //const myGraphQLSchema = // ... define or import your schema here!

  const app = express();
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema})); // bodyParser is needed just for POST.
  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

  var server = app.listen(3000, function () {
    //var port = server.address().port;
    //console.log('Example app listening at port %s', port);
  });
  return server;
};

