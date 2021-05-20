import React, { useContext } from 'react';
import PlanetsContext from '../../../context/PlanetsContext';

function Table() {  
  const { data, dataWithFilter, dataFilters } = useContext(PlanetsContext);
  const { filterByNumericValues, filterByName } = dataFilters.filters;
  let columnNames;
  if(data.length > 0) {
    columnNames = Object.keys(data[0]);
  }

  if ((filterByNumericValues.length > 0) || (filterByName.name !== '')) {
    console.log('aqui', dataWithFilter);
    return (
      <>
        { dataWithFilter.length > 0 ?
        <table>
          <thead>
            <tr>
              { columnNames.map( (column) => <td key={column}>{column}</td>)}
            </tr>
          </thead>
          <tbody>
          {
            dataWithFilter 
            && dataWithFilter.map((planet) => (
              <tr key={planet.name}>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>            
                <td>{planet.films} </td>            
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td><a href={planet.url} target="_blank" rel="noreferrer">Link</a></td>
              </tr>  
            ))
          }
          </tbody>
        </table>
        : <p>Nada a ser exibido</p>
        }
      </>
    )
  }

  return (
    <>
    { data.length > 0 ?
    <table>
      <thead>
        <tr>
          { columnNames.map( (column) => <td key={column}>{column}</td>)}
        </tr>
      </thead>
      <tbody>
      {
        data 
        && data.map((planet) => (
          <tr key={planet.name}>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>            
            <td>{planet.films} </td>            
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td><a href={planet.url} target="_blank" rel="noreferrer">Link</a></td>
          </tr>  
        ))
      }
      </tbody>
    </table>
    : <p>Nada a ser exibido</p>
    }
    </>
  )
}

export default Table;