import React from 'react';
import styled from 'styled-components';

const Days = ({ day, row, column }) => {
  return (
    <DayWrapper >
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
  border: 1px solid black;
  text-decoration: ${props => props.vacant ? "none" : "line-through"};
  color: ${props => props.vacant ? "black" : "lightgrey"};
  height: inherit;
  width: inherit;
`;

export default Days;