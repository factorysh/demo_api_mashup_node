const express = require('express');
const jwt = require('express-jwt');
const mashup = require('./mashup');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";

app.post(
  "/pict",
  jwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    issuer: "cms",
    credentialsRequired: true,
    getToken: (req) => {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      }
      return null;
    },
  }),
  async (req, res, next) => {
    if (!("txt" in req.body)) {
      res.status(400).end();
      return;
    }
    try {
      res.json(await mashup.illustrate_that_for_me(req.body.txt));
    } catch (error) {
      return next(error);
    }
  }
);

app.listen(port, host, () =>
    console.log(`App listening at http://${host}:${port}`));