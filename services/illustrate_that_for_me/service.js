const express = require('express');
const jwt = require('express-jwt');
const mashup = require('./mashup');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";

app.get("/pict",
    jwt({
        secret: process.env.SECRET,
        algorithms: ['HS256'],
        issuer: 'cms',
        credentialsRequired: true,
        getToken: (req) => {
            console.log("secret", process.env.SECRET);
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                console.log("authorization", req.headers.authorization);
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
            console.log("token", req.query.token);
              return req.query.token;
            }
            return null;
        },
    }),
    async (req, res, next) => {
        if (! ("txt" in req.query)) {
            res.status(400).end();
            return;
        }
        try {
            res.json(await mashup.illustrate_that_for_me(req.query.txt));
        } catch(error) {
            return next(error);
        }
});

app.listen(port, host, () =>
    console.log(`App listening at http://${host}:${port}`));