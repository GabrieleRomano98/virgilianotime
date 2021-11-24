'use strict';

const express = require('express');
const myDao = require('./my-dao'); // module for accessing the exams in the DB

// init express
const app = express();
const port = process.env.PORT || 3001;

// set-up the middlewares
app.use(express.json());
app.use(express.static("./client/build"));

// GET /api/time/:code
app.get('/api/time/:code', async (req, res) => {
  try {
    const time = await myDao.getTime(req.params.code);
    res.json(time);
  } catch(err) {
    res.status(500).end();
  }
});

// POST /api/time/:code
app.post('/api/time/:code', [], async (req, res) => {
  try {
    await myDao.addTime(req.body.time, req.params.code);
    res.status(201).end();
  } catch(err) {
    res.status(503).json({error: `Database error during the insert`});
  }
});

// GET /api/session/:code
app.get('/api/session/:code', async (req, res) => {
  try {
    const session = await myDao.getSession(req.params.code);
    res.json(session);
  } catch(err) {
    res.status(500).end();
  }
});

// POST /api/session/:code
app.post('/api/session/:code', [], async (req, res) => {
  try {
    await myDao.addSession(req.params.code);
    res.status(201).end();
  } catch(err) {
    res.status(503).json({error: `Database error during the insert`});
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join('./client', 'build', 'index.html'));
 });

// Activate the server
app.listen(port, () => {
  console.log(`react-score-server listening at http://localhost:${port}`);
});