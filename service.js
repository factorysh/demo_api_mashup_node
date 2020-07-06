const express = require('express');
const jwt = require('express-jwt');
const mashup = require('./mashup');

const app = express();
const port = 3000;

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
        res.json( await mashup.illustrate_that_for_me(req.query.txt));
});

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`));