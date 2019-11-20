const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Setting the layout before router
app.use(expressLayouts);

// Use Express Router
app.use('/', require('./routes'));

// setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, function(err){
    if(err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Express Server is up and running on port:${port}`);
});