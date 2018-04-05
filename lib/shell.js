import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

import schema from './schema';
console.log('schema: ', schema);

//const myGraphQLSchema = // ... define or import your schema here!

const PORT = 3000;
const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema()}));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(PORT);
