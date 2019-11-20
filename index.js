const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// Setting up static files.
app.use(express.static('./assets'));

// Setting the layout before router
app.use(expressLayouts);

// extract styles and scripts from subpages into the layout.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Use Express Router
app.use('/', require('./routes'));

// setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Listen to Server on port no 8000
app.listen(port, function(err){
    if(err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Express Server is up and running on port:${port}`);
});