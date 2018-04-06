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
let busAPIServices = {
  axios: axios,
  parseString: xml2js.parseString,
  moment: moment
}
let busAPI = createBusAPI(busAPIServices)();
let schemaServices = {
  makeExecutableSchema: makeExecutableSchema,
  busAPI: busAPI
}
let schema = createSchema(schemaServices)();
//const myGraphQLSchema = // ... define or import your schema here!

const PORT = 3000;
const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema}));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(PORT);
