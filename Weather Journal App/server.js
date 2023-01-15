// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const listening = function () {
  console.log("Server is running");
  console.log(`Running in local host: http://localhost:${port}`);
};

const port = 8000;
const server = app.listen(port, listening);

/////////////////////////////////////////////////////////////////////////
const projectData = [];

// Setup GET Route
app.get("/all", function (req, res) {
  res.send(projectData);
  console.log(projectData);
});

// Setup Post Route
app.post("/add", (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.send(projectData);
});
