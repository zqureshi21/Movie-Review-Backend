const db_env = 'development';
const config = require('./knexfile.js')[db_env];
knex = require('knex')(config)

const jwt = require('jsonwebtoken');

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const movieDetailsRouter = require('./routes/movieDetails');
const usersRouter = require('./routes/users');
const cors = require('cors');

const app = express()
const port = 3000

const accessToken = 'accessToken';
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin: '*'}))

const jwtAuthentication = (req, res, next) => {
    let authHeader = req.headers.auth;
    if (authHeader) {
        let token = authHeader
        jwt.verify(token, accessToken, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next()
        });

    } else {
        res.sendStatus(401, "error");
    }
};

app.use('/dashboard', jwtAuthentication, indexRouter);
app.use('/movieDetails', jwtAuthentication, movieDetailsRouter)
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

app.listen(port, () => {
    console.log(`Movie app listening at http://localhost:${port}`)
})