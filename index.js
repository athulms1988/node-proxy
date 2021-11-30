const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");
app.use(cors());
app.use(bodyParser.json());

const realendpoint = "https://foodpage.co.uk";

app.get('*', async (req, res) => {
  const url = realendpoint + req.path;
  request.get({
    url: url, 
    qs: req.query, 
    headers: {'x-admin': req.headers['x-admin']}
  }, function (err, resp, body) {
    if(err) {
      res.status(resp.statusCode).send(err);
    } else {
      res.status(resp.statusCode).json(JSON.parse(body));
    }
  });
});

app.post('*', async (req, res) => {
  const url = realendpoint + req.path;
  request.post({
    url: url, 
    qs: req.query,
    headers: {'x-admin': req.headers['x-admin']},
    body: JSON.stringify(req.body)
  }, function (err, resp, body) {
    if(err) {
      res.status(resp.statusCode).send(err);
    } else {
      res.status(resp.statusCode).json(JSON.parse(body));
    }
  });
});

app.put('*', async (req, res) => {
  const url = realendpoint + req.path;
  request.put({
    url: url, 
    qs: req.query,
    headers: {'x-admin': req.headers['x-admin']},
    body: JSON.stringify(req.body)
  }, function (err, resp, body) {
    if(err) {
      res.status(resp.statusCode).send(err);
    } else {
      res.status(resp.statusCode).json(JSON.parse(body));
    }
  });
});

app.listen(4000, () =>
  console.log(`Proxy API Server Running On Port -> 4000!`)
);
