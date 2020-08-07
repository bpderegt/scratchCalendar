import React from 'react';
import styled from 'styled-components';
import Weeks from './CalendarRender/Weeks.jsx'
const axios = require('axios');
const { makeCalendar } = require('./makeCalendar.js')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: Math.floor(Date.now() / 1000 / 60 / 60 / 24),
      calendar: {},
      monthIndex: 0,
      availableMonths: [],
      reservationStart: [],
      reservationHover: [],
      reservationEnd: [],
    };
    this.onDayClick = this.onDayClick.bind(this);
    this.monthIndexIncrementer = this.monthIndexIncrementer.bind(this);
  }

  componentDidMount() {
    const initHouseId = Math.floor(Math.random() * 100)
    axios.get(`/reservation/${initHouseId}`)
    .then(res => {
      const {
        today,
        calendar,
        availableMonths
      } = this.state;
      const { data } = res;
      let newCalendar = makeCalendar(today, data);
      let newAvailableMonths = Object.keys(newCalendar);
      this.setState({
        calendar: newCalendar,
        availableMonths: newAvailableMonths
      });
    })
    .catch(err => {
      console.error(err)
    });
  };

  monthIndexIncrementer(e) {
    e.preventDefault();
    // let { monthIndex } = this.state;
    // monthIndex++;
    // this.setState({
    //   monthIndex
    // });
  }

  onDayClick(e, row, column) {
    e.preventDefault();
    console.log(row, column)
  }

  render() {
    const {
      calendar,
      monthIndex,
      availableMonths
    } = this.state;
    // console.log(availableMonths)

    if (availableMonths.length === 0) return <div />

    return (
      <AppWrapper onClick={this.monthIndexIncrementer}>
        {availableMonths[monthIndex]}
        {calendar[availableMonths[monthIndex]].map((week, index) => (
          <Weeks key={index} row={index} week={week} onDayClick={this.onDayClick} />
        ))}
        {availableMonths[monthIndex + 1]}
        {calendar[availableMonths[monthIndex + 1]].map((week, index) => (
          <Weeks key={index} row={index} week={week} onDayClick={this.onDayClick} />
        ))}
      </AppWrapper>
    )
  };
}

const AppWrapper = styled.div`
  width: 28em;
  height: 20em;
`;

export default App;

//can refactor this to only generate calendars that the user wants to see (i.e. lazy-load calendar)
