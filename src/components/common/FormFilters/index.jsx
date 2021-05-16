/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../../../context/PlanetsContext';
import DefaultButton from '../../foundation/Button/styles';

function FormFilters() {
  const { filterType, filterQuantity, handleAddNumericFilter } = useContext(PlanetsContext);
  const [ filters, setFilters ] = useState({ 
    column: filterType[0], 
    comparison: filterQuantity[0], 
    value: ''
  });

  const handleFilterChange = ({target}) => {
    const { name, value } = target;
    
    setFilters({...filters, [name]: value})
  }

  const handleSubmitFilter = (e) => {    
    e.preventDefault();

    handleAddNumericFilter(filters);    
  }

  useEffect(() => {
    setFilters({...filters, column: filterType[0], comparison: filterQuantity[0]});
  },[filterType]);

  return (
    <form onSubmit={(event) => handleSubmitFilter(event)}>
      <select name="column" onChange={(event) => handleFilterChange(event)}>
        {filterType.map( (item) => (<option key={item} >{item}</option>))}
      </select>
      <select name="comparison" onChange={(event) => handleFilterChange(event)}>
        {filterQuantity.map( (item) => (<option key={item} >{item}</option>))}
      </select>
      <input type="number" name="value" onChange={(event) => handleFilterChange(event)}/>
      <DefaultButton type="submit">Adicionar Filtro</DefaultButton>
    </form>
  )
}

export default FormFilters;