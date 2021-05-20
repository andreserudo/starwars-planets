import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import { getAllPlanetsAPI, requestStates } from '../services';

const defaultFilters = {
  filters:
    {
      filterByName: {
        name: ''
      },
      filterByNumericValues: []
    }
  };

const defaultFilterType = 
  ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
const defaultFilterQuantity =
 ['maior que', 'menor que', 'igual a'];

function Provider({children}) {  
  const [data, setData] = useState([]);
  const [dataWithFilter, setDataWithFilter] = useState([]);
  const [dataFilters, setFilters] = useState(defaultFilters);
  const [filterType, setFilterType] = useState(defaultFilterType.sort());
  const [filterQuantity, setFilterQuantity] = useState(defaultFilterQuantity.sort());
  const {ERROR, LOADING, SUCCESS} = requestStates;
  const [serviceStatus, setServiceStatus] = useState(LOADING);  

  const removeResidents = ( arrayOfPlanets ) => {
    return arrayOfPlanets.map( item => {
      delete item.residents;      
      return item;
    })
  }

  const handleRemoveFilter = (filter) => {    
    const newColums = [...filterType, filter.column];
    const newComparisons = [...filterQuantity, filter.comparison];
    const orderedTypes = newColums.sort();
    const newFilterByNumericValues = dataFilters.filters.filterByNumericValues
      .filter( item => item.column !== filter.column);
    
    setFilterType([...orderedTypes]);
    setFilterQuantity([...newComparisons.sort()])

    setFilters((prevState) => ({
      filters: {
        ...prevState.filters,
        filterByNumericValues: [...newFilterByNumericValues]
      }
    }));
    
  }

  const handleAddNumericFilter = (filter) => {    
    const quantityToRemove = filter.column;
    const comparisonToRemove = filter.comparison;
    const newColumns = filterType.filter(filter => filter !== quantityToRemove);
    const newComparisons = filterQuantity.filter(filter => filter !== comparisonToRemove);

    setFilters((prevState) => ({
      filters: {
        ...prevState.filters,
        filterByNumericValues: [...prevState.filters.filterByNumericValues, filter]
      }
    }));
    
    setFilterType([...newColumns]);
    setFilterQuantity([...newComparisons]);
  }

  const handleFilterNameChange = ({target}) => {
    const {value} = target;

    setFilters((prevState) => ({
      filters: {
        ...prevState.filters,
        filterByName:{name: value}
      }
    }));
  }

  const handleRequestPlanetsAPI = async () => {
    const response = await getAllPlanetsAPI();

    if (response === null) {      
      setServiceStatus(ERROR);
      return ;
    }else{      
      const planetsWithLinks = removeResidents([...response]);
      const aux = [...Object.values(planetsWithLinks)];
      
      updateData(aux);      
      setServiceStatus(SUCCESS);
    }
  }

  const updateData = (newData) => {    
    setData(newData);

  };  

  const applyNumericFilters = () => {    
    const { filterByNumericValues } = dataFilters.filters;    
    let planetsData = [...data];
    let planetsFiltered = [];

    filterByNumericValues.forEach(element => {
      if (element.comparison === 'maior que') {
        planetsFiltered = planetsData
          .filter((planet) => parseInt(planet[element.column], 10) > parseInt(element.value, 10)
           && planet[element.column] !== 'unknown');
      } else if (element.comparison === 'menor que') {
        planetsFiltered = planetsData
          .filter((planet) => parseInt(planet[element.column], 10) < parseInt(element.value, 10)
          && planet[element.column] !== 'unknown');
      } else {
        planetsFiltered = planetsData
          .filter((planet) => parseInt(planet[element.column], 10) === parseInt(element.value, 10)
           && planet[element.column] !== 'unknown');
      }
      planetsData = [...planetsFiltered];        
    });

    setDataWithFilter(planetsFiltered);
  }

  useEffect(() => {
    handleRequestPlanetsAPI();    
  },[]);

  useEffect(() => {    
    const { filterByName, filterByNumericValues } = dataFilters.filters;
    const { name } = filterByName;
    if(name !== '') {
      let newData = [];
      if(filterByNumericValues.length > 0) {
         newData = dataWithFilter.filter(planet => planet.name.includes(name) === true);
      } else {
        newData = data.filter(planet => planet.name.includes(name) === true);      
      }
      setDataWithFilter(newData);
    } else {
      if(filterByNumericValues.length > 0) {
        applyNumericFilters();
      }
    }
  }, [dataFilters.filters.filterByName]);

  useEffect(() => {    
    const { filterByNumericValues } = dataFilters.filters;
    if (filterByNumericValues.length === 0) {
      handleRequestPlanetsAPI();
    } else {
      applyNumericFilters();
    }
  }, [dataFilters.filters.filterByNumericValues]);

  const context = {
    data,
    dataWithFilter,
    serviceStatus,
    dataFilters,
    handleFilterNameChange,
    filterType,
    filterQuantity,
    handleAddNumericFilter,
    handleRemoveFilter
  };

  return (
    <PlanetsContext.Provider value={context}>
      {children}
    </PlanetsContext.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.shape({}),
};

Provider.defaultProps = {
  children: {},
};

export default Provider;