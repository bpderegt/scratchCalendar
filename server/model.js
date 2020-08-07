const db = require('../db/index.js')

const getOneReservation = (id, callback) => {
  db.getOneReservation(id, (err, dates) => {
    if (err) {
      callback(err)
    } else {
      datesArr = []
      dates.map(date => datesArr.push(date.num_date))
      callback(null, datesArr);
    }
  })
}

module.exports = {
  getOneReservation
}