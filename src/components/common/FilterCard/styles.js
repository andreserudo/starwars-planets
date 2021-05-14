import styled from 'styled-components';

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;  
  justify-content: space-around;

  border-radius: 6px;
  padding: .2rem .5rem;

  background-color: #C4C4C4;  

  & + &, &:first-of-type {
    margin-right: 1rem;
  }

  &:last-of-type {
    margin-right: unset;
  }
`;

const FilterTitle = styled.span`
  color: white;
`;

const FilterButton = styled.button``;

export {FilterWrapper , FilterButton, FilterTitle};