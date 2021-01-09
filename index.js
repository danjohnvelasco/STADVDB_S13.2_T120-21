// import dependencies
const express = require('express');
const hbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

// import routes
const indexRouter = require('./routes/indexRouter.js');
const apiRouter = require('./routes/apiRouter.js');


// create express app
const app = express();
const port = 3000;


// Setup handlebars
app.set('view engine', 'hbs'); // Set template 
app.engine('hbs', hbs({ // HBS Config
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
}));

// Setup middlewares
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

// Make the following routes available
app.use('/', indexRouter);

app.use('/api', apiRouter)


// serve static files 
app.use(express.static('public'));

// listen on port
app.listen(port, () => console.log(`Listening to ${port}`));