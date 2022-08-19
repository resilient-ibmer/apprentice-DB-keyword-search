const database = require("./database");
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

async function returnAllProcesses(req, res){
  const processes = await database.getAllProcesses();
  
  console.log("index.js", processes);
  res.json( { processes } );
};

// Defining endpoints
app.get('/', returnAllProcesses);


app.get('/processes', (req, res) => {
  let processes, criteria;
  processes = database.getAllRowsFrom("processes")

  // // Passing in this callback because getAllRows was returning undefined
  // database.getAllRowsFrom("processes", (rows) => {
  //   processes = rows;
  // });
  // database.getAllRowsFrom("criteria", (rows) => {
  //   criteria = rows;
  // });

  res.json( {"processes": processes} );
});

app.post('/processes', (req, res) => {
  const data = req.body;

  database.insertIntoProceses(data);
});

// starting the server
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});