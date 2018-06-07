const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors')

const schema = require('./schema/schema');

const app = express();

app.use(cors());

mongoose.connect(
  'mongodb://ashish:test123@ds147180.mlab.com:47180/gql-ninja_92',
);

mongoose.connection.once('open', () => {
  console.log('connected to mlab');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(4000, () => {
  console.log('Listening on 4000');
});
