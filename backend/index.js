const database = require("./database");
const wordMatcher = require("./wordMatcher");
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


// defining the Express app
const app = express();
// adding Helmet to enhance your Rest API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));

const port = 3001;

// Defining endpoints
app.get('/processes', async (req, res) => {
  const {query} = req.query;
  const processes = await database.getAllProcesses();
  const matches = wordMatcher.run(processes, query);

  res.json( { matches } );
});

app.post('/processes', (req, res) => {
  const data = req.body;

  const result = database.insertAllProcesses(data);
});

// starting the server
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});