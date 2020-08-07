const mysql = require('mysql');
const credentials = require('./config/config.js')

let connection = mysql.createConnection(credentials);

connection.connect();

const seed = (query, dateNum, callback) => {
  connection.query(query, (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(null, dateNum);
    }
  });
}

const endSeeding = () => {
  connection.end();
  console.log('RESERVATION SEEDING DONE');
}

const getOneReservation = (id, callback) => {
  connection.query(`SELECT num_date FROM reservations WHERE home_id = ${id}`, (err, dates) => {
    if (err) {
      callback(err)
    } else {
      callback(null, dates);
    }
  })
};

// connection.end();

module.exports = {
  seed,
  endSeeding,
  getOneReservation
};