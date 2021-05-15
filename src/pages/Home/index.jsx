import React from 'react';
import FiltersActivated from '../../components/common/FiltersActivated';
import FiltersSection from '../../components/common/FiltersSection/Filters';
import Header from '../../components/common/Header';
import { ContainerPage, MainContent } from './styles';

function Home() {  
  return (
    <>
      <Header />
      <ContainerPage>            
        <FiltersSection />
        <MainContent>
          <FiltersActivated />
        </MainContent>
      </ContainerPage>    
    </>
  )
}

export default Home;