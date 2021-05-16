import React, { useContext } from 'react';
import PlanetsContext from '../../../context/PlanetsContext';
import FormFilters from '../FormFilters';
import FilterContainer from './styles';

function FiltersSection() {
  const { handleFilterNameChange } = useContext(PlanetsContext);  

  return (
    <FilterContainer>
      <input  onChange={(event) => handleFilterNameChange(event)}/>
      <FormFilters />
    </FilterContainer>
  )
}

export default FiltersSection;