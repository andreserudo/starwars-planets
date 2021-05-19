import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import { FilterWrapper, FilterButton, FilterTitle } from './styles';
import PlanetsContext from '../../../context/PlanetsContext';

function FilterCard({ filter }) {
  const { handleRemoveFilter } = useContext(PlanetsContext);
  const { column } = filter;

  const handleCloseFilter = () => {    
    handleRemoveFilter(filter);
  }

  return (
    <FilterWrapper>
      <FilterTitle>{ column } </FilterTitle>
      <FilterButton onClick={() => handleCloseFilter()}>X</FilterButton>
    </FilterWrapper>
  )
}

FilterCard.propTypes = {
  filter: Proptypes.shape({
    column: Proptypes.string.isRequired,    
  }).isRequired,
}

export default FilterCard;