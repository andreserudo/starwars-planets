import React from 'react';
import Proptypes from 'prop-types';
import { FilterWrapper, FilterButton, FilterTitle } from './styles';

function FilterCard({ children }) {
  return (
    <FilterWrapper>
      <FilterTitle>{ children } </FilterTitle>
      <FilterButton>X</FilterButton>
    </FilterWrapper>
  )
}

FilterCard.propTypes = {
  children: Proptypes.string.isRequired,
}

export default FilterCard;