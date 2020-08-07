const express = require('express');
const path = require('path');
const app = express();
const port = 3127;
const Model = require('./model.js');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/reservation/:id', (req, res) => {
  Model.getOneReservation(req.params.id, (err, dates) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(dates);
    }
  })
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
