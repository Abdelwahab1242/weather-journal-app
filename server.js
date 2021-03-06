// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

// Callback to debug
function listening() {
  console.log("Server Running");
  console.log(`Running on localhost: ${port}`);
}

// Initialize all route with a callback function
app.get("/all", (request, response) => {
  // Callback function to complete GET '/all'
  response.send(projectData);
});

// Post Route
app.post("/add", saveData);
function saveData(req, res) {
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    input: req.body.input
  };
  projectData.push(newEntry);
  res.send(projectData);
}
