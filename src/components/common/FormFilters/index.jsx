/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../../../context/PlanetsContext';
import DefaultButton from '../../foundation/Button/styles';
import {FormFilterWrapper, FormErrorMessage} from './styles';

function FormFilters() {
  const { filterType, filterQuantity, handleAddNumericFilter } = useContext(PlanetsContext);
  const [ filters, setFilters ] = useState({ 
    column: filterType[0], 
    comparison: filterQuantity[0], 
    value: ''
  });
  const [ allowNewFilters, setAllowNewFilters ] = useState(true);
  const [ error, setError ] = useState(false);

  const handleFilterChange = ({target}) => {
    const { name, value } = target;
    
    setFilters({...filters, [name]: value})
  }

  const handleSubmitFilter = (e) => {    
    e.preventDefault();

    if(filters.value !== '') {
      setError(false);
      handleAddNumericFilter(filters);
    } else {
      setError(true);
    }
    
  }

  useEffect(() => {
    setFilters({...filters, column: filterType[0], comparison: filterQuantity[0]});
  },[filterType]);

  useEffect(() => {
    if(filterQuantity.length === 0) {
      setAllowNewFilters(true);
    } else {
      setAllowNewFilters(false);
    }
  }, [filterQuantity]);

  return (
    <FormFilterWrapper>
      <form onSubmit={(event) => handleSubmitFilter(event)}>
        <label htmlFor="column">
          Filtre por:
          <select id="column" name="column" onChange={(event) => handleFilterChange(event)}>
            {filterType.map( (item) => (<option key={item} >{item}</option>))}
          </select>
        </label>
        <label htmlFor="comparison">
          Comparando por:        
          <select id="comparison" name="comparison" onChange={(event) => handleFilterChange(event)}>
            {filterQuantity.map( (item) => (<option key={item} >{item}</option>))}
          </select>
        </label>
        <label htmlFor="value">
          Valor:
          <input 
            type="number" 
            name="value"            
            onChange={(event) => handleFilterChange(event)}
            placeholder="0"
            min="0"
          />
        </label>     
        <DefaultButton type="submit" disabled={allowNewFilters}>Adicionar Filtro</DefaultButton>
      </form>
      { error && <FormErrorMessage>O campo de valor deve ser preenchido.</FormErrorMessage>}
    </FormFilterWrapper>
  )
}

export default FormFilters;