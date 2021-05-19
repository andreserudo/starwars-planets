import handleDateFormat from "../utils/handleDateFormat";
// import data from './sample';
const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

const requestStates = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

const getFilmNameAPI = async (url) => {
  try {
    const request = await fetch(url);
    const response = await request.json();
    //console.log('responseNo', String(response.title));
    return response.title;
  } catch (error) {
    return null;
  }
}

const handleInternalLinks = (arrayOfPlanets) => {    
  arrayOfPlanets.forEach( planet => {
    let createdDate = new Date(planet.created);
    let editedDate= new Date(planet.edited);      

    planet.created = handleDateFormat(createdDate);
    planet.edited = handleDateFormat(editedDate);
  });
  
  return arrayOfPlanets;
}

const getAllPlanetsAPI = async () => {
  try {
    const request = await fetch(endpoint).catch(error => error);
    const response = await request.json();   

    const planets = handleInternalLinks(response.results);
    
    return planets;
  } catch (error) {

    return null;
  }
}

export { 
  requestStates,
  getAllPlanetsAPI,
  getFilmNameAPI
};