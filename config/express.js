/**
 * Created by Hristo Skipernov on 13/10/2017.
 */

const express = require('express');
const handlebars = require('express-handlebars');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const favicon = require('serve-favicon');
const path = require('path');

module.exports = (app) => {

    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));

    app.set('view engine', '.hbs');

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        secret: 'neshto-taino!@#$%',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(express.static('public'));
    app.use(favicon(path.join(__dirname,'../public','img','favicon.ico')));
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
        }
        next();
    });

    app.use(function (req, res, next) {
        // if there's a flash message in the session request, make it available in the response, then delete it
        if (req.session.sessionFlash) {
            res.locals.messages = req.session.sessionFlash;
            delete req.session.sessionFlash;
        }
        next();
    });
};