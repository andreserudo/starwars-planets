import React, { useContext } from 'react';
import FiltersActivated from '../../components/common/FiltersActivated';
import FiltersSection from '../../components/common/FiltersSection/Filters';
import Header from '../../components/common/Header';
import LoadingAnimation from '../../components/common/LoadingAnimation';
import Table from '../../components/common/Table';
import PlanetsContext from '../../context/PlanetsContext';
import { requestStates } from '../../services';
import { ContainerPage, MainContent } from './styles';

function Home() {  
  const { serviceStatus } = useContext(PlanetsContext);
  
  return (
    <>
      <Header />
      <ContainerPage>            
        <FiltersSection />
        <MainContent>
          <FiltersActivated />
          { serviceStatus === requestStates.LOADING && <LoadingAnimation />}
          { serviceStatus === requestStates.ERROR && <p>{serviceStatus}</p>}
          { serviceStatus === requestStates.SUCCESS && <Table />}
        </MainContent>
      </ContainerPage>    
    </>
  )
}

export default Home;