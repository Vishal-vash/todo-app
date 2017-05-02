//Get Dependencies

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

//Connect to DB
mongoose.connect('mongodb://localhost/tasklist')

//Get Api Routes
const api = require('./server/routes/api');

const app = express();

//Parses for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Point static path to dist
app.use(express.static(path.join(__dirname, '/client/dist')))

//Set Api Routes
app.use('/api', api);

//Catch all other routes and return Index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/dist/index.html"));
})

//Get Port from Enviroment and store in express
const Port = process.env.Port || 3000;
app.set('port', Port);

//Create HTTP Server
const server = http.createServer(app);

//Listen to the Port on all Network interfaces
server.listen(Port, () => {
    console.log("Server is running on : " + Port)
})