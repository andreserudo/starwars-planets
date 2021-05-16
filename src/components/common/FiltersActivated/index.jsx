import React, { useContext } from 'react';
import FilterCard from '../FilterCard';
import PlanetsContext from '../../../context/PlanetsContext';
import FiltersActivatedWrapper from './styles';

function FiltersActivated() {
  const { dataFilters } = useContext(PlanetsContext);
  const { filterByNumericValues } = dataFilters.filters;

  return (
    <FiltersActivatedWrapper>
      { filterByNumericValues.length > 0
      &&
        filterByNumericValues.map((filter) => <FilterCard key={filter} filter={filter} />)
      }
    </FiltersActivatedWrapper>
  )
}

export default FiltersActivated;