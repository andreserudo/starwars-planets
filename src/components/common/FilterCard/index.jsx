import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import { FilterWrapper, FilterButton, FilterInfo, FilterText } from './styles';
import PlanetsContext from '../../../context/PlanetsContext';

function FilterCard({ filter }) {
  const { handleRemoveFilter } = useContext(PlanetsContext);
  const { column, comparison, value } = filter;

  const handleCloseFilter = () => {    
    handleRemoveFilter(filter);
  }

  return (
    <FilterWrapper>
      <FilterInfo>
        <FilterText>{ column }</FilterText>
        <FilterText>{ comparison }</FilterText>
        <FilterText>{ value }</FilterText>
      </FilterInfo>
      <FilterButton onClick={() => handleCloseFilter()}>X</FilterButton>
    </FilterWrapper>
  )
}

FilterCard.propTypes = {
  filter: Proptypes.shape({
    column: Proptypes.string.isRequired,
    comparison: Proptypes.string.isRequired,
    value: Proptypes.string.isRequired
  }).isRequired,
}

export default FilterCard;