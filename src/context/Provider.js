import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import { getAllPlanetsAPI } from '../services';

function Provider({children}) {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRequestPlanetsAPI = async () => {
    const planets = await getAllPlanetsAPI();
    if (planets === null) {
      console.log('deu erro');
    }
    setData(planets);
    setLoading(!loading);
  }

  useEffect(() => {
    handleRequestPlanetsAPI();
  },[]);

  const context = {
    data
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