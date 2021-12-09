const express = require('express');
const session = require('express-session');

const app = express();
const port = 4000;
const routes = require('./routes');

const cors = require('cors');

const corsOptions = {
    origin : true,
    credentials : true
};

app.use(cors(corsOptions));

// Session
app.use(session({
    secret: 'heeloasdfa',
    resave: false,
    saveUninitialzed: true
}));

// Using body-parser in express
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

// Route definition
app.use('/', routes);

// Run server
app.listen(port, function () {
    console.log('Example app listening on port : ' + port);
});