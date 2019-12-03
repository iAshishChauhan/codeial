const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// Setting up static files.
app.use(express.static('./assets'));

// Express URL Parser
app.use(express.urlencoded());

// Cookie Parser
app.use(cookieParser());

// Setting the layout before router
app.use(expressLayouts);

// extract styles and scripts from subpages into the layout.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MiddleWare for Encrypting session cookies.
app.use(session({
    name: 'codeial',
    // TODO Change the secret before deployment in production mode.
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (60 * 100 * 1000)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Use Express Router
app.use('/', require('./routes'));

// Listen to Server on port no 8000
app.listen(port, function(err){
    if(err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Express Server is up and running on port:${port}`);
});