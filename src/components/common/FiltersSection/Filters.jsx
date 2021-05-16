import React, { useContext } from 'react';
import PlanetsContext from '../../../context/PlanetsContext';
import FormFilters from '../FormFilters';
import FilterContainer from './styles';

function FiltersSection() {
  const { handleFilterNameChange } = useContext(PlanetsContext);  

  return (
    <FilterContainer>
      <label htmlFor="planetName">
        Nome:
        <input 
          id="planetName"
          onChange={(event) => handleFilterNameChange(event)}
          placeholder="Digite aqui..."
        />
      </label>
      <FormFilters />
    </FilterContainer>
  )
}

export default FiltersSection;