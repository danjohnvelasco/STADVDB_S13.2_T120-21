// import dependencies
const express = require('express');

// import routes
const apiRouter = require('./routes/apiRouter.js');


// create express app
const app = express();
const port = 3000;


// Setup middlewares
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use('/api', apiRouter)

// serve static files 
app.use(express.static('public'));

// Make the following routes available
app.use('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


// listen on port
app.listen(port, () => console.log(`Listening to ${port}`));