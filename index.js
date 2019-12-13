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
const MongoStore = require('connect-mongo')(session);

// Setting up SCSS
// for SASS Middleware
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'expanded',
    prefix: '/css'
}));

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
// Mongo Store is used to store the session cookie persistently in the DB
app.use(session({
    name: 'codeial',
    // TODO Change the secret before deployment in production mode.
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (60 * 100 * 1000)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: false
        },
        function(err) {
            if(err) { console.log(err); }
            else { console.log('connect-mongodb setup ok'); }
        }
    )
}));
// Call the passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Send current user information to the views
app.use(passport.setAuthenticatedUser);

// Use Express Router
// Kyuki middlewares are defined before route.
app.use('/', require('./routes'));

// Listen to Server on port no 8000
app.listen(port, function(err){
    if(err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Express Server is up and running on port:${port}`);
});