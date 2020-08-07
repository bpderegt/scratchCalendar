const _daysPerMonth = {
  1: 31,
  2: 59,
  3: 90,
  4: 120,
  5: 151,
  6: 181,
  7: 212,
  8: 243,
  9: 273,
  10: 304,
  11: 334,
  12: 365
};

const _months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'Novemeber',
  12: 'December'
}

const _weekDays = {
  0: 'Wednesday',
  1: 'Thursday',
  2: 'Friday',
  3: 'Saturday',
  4: 'Sunday',
  5: 'Monday',
  6: 'Tuesday',
};

const _numDateToObj = (numDate) => {
  numDate += 1;

  const weekday = _weekDays[numDate % 7];
  let year = Math.floor((numDate) / 365.25) + 1970;
  numDate -= Math.floor(Date.parse(`1/1/${year}`) / 1000 / 60 / 60 / 24);

  if (numDate === 0) {
    year -= 1;
    numDate = 365;
  }

  let i = 1;
  while (numDate - _daysPerMonth[i] > 0) {
    if (i === 3 && year % 4 === 0) numDate -= 1;
    i++;
  }

  let day = numDate - (_daysPerMonth[i - 1] || 0);
  if (year % 4 === 0) {
    if (i === 3) {
      if (day === 1) {
        i -= 1;
        day = 29;
      } else {
        day -= 1;
      }
    } else if (day === 0) {
      day = 31;
      i -= 1;
    }
  }

  const monthNum = i;
  const monthString = _months[i];

  return { weekday, monthString, monthNum, day, year };
}

// let date = `1/2/2021`
// console.log(_numDateToObj(Math.floor(Date.parse(date) / 1000 / 60 / 60 / 24)))

const makeCalendar = (today, bookedDates) => {
  const calendar = {};

  for (let i = 0; i < bookedDates.length; i++) {
    let vacancyCheck = bookedDates[i];
    while (bookedDates[i + 1] && vacancyCheck < bookedDates[i + 1]) {
      let dateObj = _numDateToObj(vacancyCheck)
      if (vacancyCheck < today || vacancyCheck !== bookedDates[i]) {
        dateObj.vacant = true;
      } else {
        dateObj.vacant = false;
      }

      const {
        year,
        weekday,
        monthString
      } = dateObj;
      const key = `${monthString}-${year}`

      if (calendar[key]) {
        if (weekday === 'Sunday') {
          calendar[key].push([dateObj])
        } else {
          let length = calendar[key].length - 1;
          calendar[key][length].push(dateObj)
        }
      } else {
        calendar[key] = [[dateObj]]
      }
      vacancyCheck += 1;
    }
  }
  return calendar;
};

module.exports = {
  makeCalendar
}