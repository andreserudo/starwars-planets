/* eslint-disable no-unused-vars */
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

    console.log(newFilterByNumericValues);
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
      console.log('veio aqui');
      const planetsWithLinks = removeResidents([...response]);
      const aux = [...Object.values(planetsWithLinks)];
      
      updateData(aux);
      setDataWithFilter(aux);
      setServiceStatus(SUCCESS);
    }
  }

  const updateData = (newData) => {    
    setData(newData);

  };  

  const applyNumericFilters = () => {    
    const { filterByNumericValues } = dataFilters.filters;
    console.log('mno apply', data);
    let planetsData = [...data];
    let planetsFiltered = [];
    console.log(filterByNumericValues);
    console.log(planetsData);
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

  const applyReloadBeforeTextFilter = async () => {
    const { filterByNumericValues } = dataFilters.filters;
    console.log('foi de base');
    await handleRequestPlanetsAPI();
    if(filterByNumericValues.length > 0) {
      applyNumericFilters();
      return ;
    }
    console.log('na saida', data);
  }

  useEffect(() => {
    handleRequestPlanetsAPI();    
  },[]);

  useEffect(() => {
    console.log('1');
    const { filterByName, filterByNumericValues } = dataFilters.filters;
    const { name } = filterByName;
    if(name !== '') {
      console.log('texto1');
      const newData = dataWithFilter.filter(planet => planet.name.includes(name) === true);
      setDataWithFilter(newData);
    } else {
      if(filterByNumericValues.length > 0) {
        applyNumericFilters();
      }
    }
  }, [dataFilters.filters.filterByName]);

  useEffect(() => {
    console.log('2');
    const { filterByNumericValues } = dataFilters.filters;
    if (filterByNumericValues.length === 0) {
      handleRequestPlanetsAPI();
    } else {
      applyNumericFilters();
    }
  }, [dataFilters.filters.filterByNumericValues]);

  // useEffect(() => {
  //   if(dataFilters.filters.filterByNumericValues.length > 0) {
  //     applyNumericFilters()
  //   }
  // }, [dataFilters]);

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