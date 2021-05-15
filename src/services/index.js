const endpoint = 'https://swapi-trybe.herokuapp.com/api/planet/';

const requestStates = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

const getAllPlanetsAPI = async () => {
  try {
    const request = await fetch(endpoint).catch(error => error);
    const response = await request.json();

    return response.results;
  } catch (error) {
    //console.log('deu erro :(');
    return null;
  }
}

export { getAllPlanetsAPI, requestStates };