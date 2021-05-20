import styled from 'styled-components';

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;  
  justify-content: space-around;

  border-radius: 6px;
  padding: .4rem .5rem;

  background-color: #C4C4C4;  

  & + &, &:first-of-type {
    margin-right: 1rem;
  }

  &:last-of-type {
    margin-right: unset;
  }
`;

const FilterInfo = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FilterText = styled.span`
  color: white;
`;

const FilterButton = styled.button`
  margin-left: .5rem;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  padding: .25rem;

  &:hover{
    opacity: .7;    
    transition: opacity 1s;
  }
`;

export {FilterWrapper , FilterButton, FilterInfo, FilterText};