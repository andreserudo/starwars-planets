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

function Provider({children}) {  
  const [data, setData] = useState([]);
  const [dataFilters, setFilters] = useState(defaultFilters);
  const {ERROR, LOADING, SUCCESS} = requestStates;
  const [serviceStatus, setServiceStatus] = useState(LOADING);  

  const removeResidents = ( arrayOfPlanets ) => {
    return arrayOfPlanets.map( item => {
      delete item.residents;      
      return item;
    })
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

      setData(aux);      
      setServiceStatus(SUCCESS);
    }
  }

  useEffect(() => {
    handleRequestPlanetsAPI();    
  },[]);

  useEffect(() => {
    const { filterByName } = dataFilters.filters;
    const { name } = filterByName;
    if(name !== '') {
      const newData = data.filter(planet => planet.name.includes(name) === true);
      setData(newData);
    } else {
      if(serviceStatus === requestStates.SUCCESS) {
        // console.log('reinicia');
        // handleRequestPlanetsAPI();
      }
    }
  }, [dataFilters.filters.filterByName]);

  const context = {
    data,
    serviceStatus,
    dataFilters,
    handleFilterNameChange
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