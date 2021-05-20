import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/foundation/Button';
import NotFoundAnimation from '../../components/common/NotFoundAnimation';
import ContentNotFoundPageWrapper from './styles';
import Header from '../../components/common/Header';

function NotFound() {
  return (
    <ContentNotFoundPageWrapper>
      <Header />
      <h1>Perdido você está</h1>
      <NotFoundAnimation />
      <Button>
        <Link to="/">Voltar para o Conhecido</Link>
      </Button>
    </ContentNotFoundPageWrapper>
  )
}

export default NotFound;