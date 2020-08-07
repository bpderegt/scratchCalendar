import React from 'react';
import styled from 'styled-components';
import Days from './Days.jsx';

const Weeks = ({ week, row }) => {
  console.log(week)
  return (
    <WeekWrapper row={row}>
      {week.map((day, index) => (
        <Days key={index} row={row} column={index} day={day} />
      ))}
    </WeekWrapper>
  )
}

const WeekWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.row === 0 ? "flex-end" : "flex-start" };
`;

export default Weeks;