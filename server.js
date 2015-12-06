// server.js
import express from 'express';
import schema from './schema';
import expressGraphql from 'express-graphql';

// new dependencies

import { graphql } from 'graphql';
import bodyParser from 'body-parser';

let app  = express();
let PORT = 3000;

// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.use('/graphql', expressGraphql({
  schema: schema,
  graphiql: true
}));

let server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});