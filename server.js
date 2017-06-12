//Get dependenecies
const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      mongoose = require('mongoose'),
      http = require('http');

//Connect TO DB 
mongoose.connect('mongodb://localhost/todo')

//Get Our API Routes
const api = require('./server/routes/api');

const app = express();

//Parsing POST Data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : false
}))

//Point path to get all static files like HTML/CSS/Images/JS
app.use(express.static(path.join(__dirname + '/client/dist')));

//Set Our API routes
app.use('/api', api)

//Get all routes and render index html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/dist/index.html'))
})

//Store the port in express
const Port = process.env.Port || 3000;
app.set('port', Port);

//Create http server
const server = http.createServer(app);

//Listen to the server at provided Port
server.listen(Port, () => console.log("Server started at " + Port)); 
