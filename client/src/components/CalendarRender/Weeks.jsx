import React from 'react';
import styled from 'styled-components';
import Days from './Days.jsx';

const Weeks = ({ week, row, onDayClick }) => {
  const dummyDay = {
    day: null
  };
  while (week.length < 7) {
    if (row === 0) {
      week.unshift(dummyDay);
    } else {
      week.push(dummyDay);
    }
  }
  return (
    <WeekWrapper row={row}>
      {week.map((day, index) => (
        <Days key={index} row={row} column={index} day={day} onDayClick={onDayClick} />
      ))}
    </WeekWrapper>
  )
}

const WeekWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.row === 0 ? "flex-end" : "flex-start" };
  border-top: ${props => props.row === 0 ? "1px solid black" : "none"};
  border-left: 1px solid black;
`;

export default Weeks;