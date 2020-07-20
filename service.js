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
        getToken: (req) => {
            return req.query.token;
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