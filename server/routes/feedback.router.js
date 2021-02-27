// feedback.router.js

const express = require('express');
const router = express.Router();
// Using a array of data on the server, we will eventually
// move this back into the database.
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const sqlText = `
      SELECT * FROM "feedback"
        ORDER BY "id" DESC;
  `;
  pool.query(sqlText)
  .then(response => {
    console.log(response);
    res.send(response.rows)
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

router.post('/', (req, res) => {
  console.log('req', req);
  console.log('req.body', req.body);
  const feedback = [ 
    Number(req.body.feeling), Number(req.body.understanding), Number(req.body.support), req.body.comments
  ]
  console.log(feedback)
  const sqlText = `
      INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
        VALUES ($1, $2, $3, $4);
  `;
  pool.query(sqlText, feedback)
  .then(response => {
    console.log(response);
    res.sendStatus(200);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
})

module.exports = router