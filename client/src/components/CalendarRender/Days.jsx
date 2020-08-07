import React from 'react';
import styled from 'styled-components';

const Days = ({ day, row, column, onDayClick }) => {
  return (
    <DayWrapper onClick={(e) => day.day === null ? null : onDayClick(e, row, column)}>
      <DetailWrapper vacant={day.vacant}>
        {day.day}
      </DetailWrapper>
    </DayWrapper>
  )
}

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 4em;
  width: 4em;
`;

const DetailWrapper = styled.div`
  text-decoration: ${props => props.vacant ? "none" : "line-through"};
  color: ${props => props.vacant ? "black" : "lightgrey"};
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  height: inherit;
  width: inherit;
`;

export default Days;