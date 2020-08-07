const db = require('../index.js');

const daysPerMonth = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31
};

const weekDay = {
  3: 'Sunday',
  4: 'Monday',
  5: 'Tuesday',
  6: 'Wednesday',
  0: 'Thursday',
  1: 'Friday',
  2: 'Saturday'
};

const seeder = (limit, i = 1) => {
  if (i > limit) {
    db.endSeeding();
    return;
  }
  const houseRand = Math.random() / 2;
  let year = 2020;
  let month = 8;
  let day = 1;

  let yes = 0;
  let no = 0;

  while (year <= 2021) {
    while (month <= 12) {
      while (day <= daysPerMonth[month]) {
        const dayRand = Math.random() / 2;
        if ((houseRand + dayRand) < 0.55) {
          yes++
          let dateNum = dateToNum(`${month}/${day}/${year}`);
          let stringDate = `${month < 10 ? `0${month}`: month}/${day < 10 ? `0${day}` : day}/${year} ${weekDay[dateNum % 7]}`
          let query = `INSERT INTO reservations (home_id, num_date) VALUES (${i}, ${dateNum});`
          db.seed(query, dateNum, (err, succ) => {
            if (err) {
              throw(err);
            }
          });
        } else {
          no++;
        }
        day += 1;
      }
      month += 1;
      day = 1;
    }
    month = 1;
    year += 1;
  }
  const fillRate = Math.floor((yes / (yes + no)) * 1000) / 10;
  console.log('Booked %: ', i, `${fillRate}%`)
  return seeder(limit, i + 1);
};

const dateToNum = (date) => {
  return Math.floor(Date.parse(date) / 1000 / 60 / 60 / 24);
};

seeder(100);
