import React from 'react';
import Lottie from 'react-lottie';
import loading from '../../../themes/animations/LoadingPlanetsWithRey/LoadingPlanetsWithRey.json';
import LoadingAnimationWrapper from './styles';

const options = {
  loop: true,
  autoplay: true,
  animationData: loading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }  
}

function LoadingAnimation() {
  return (
    <LoadingAnimationWrapper>
      <Lottie
        options={options}
        height={300}
        width={300}
      />
      <p>Procurando os melhores planetas</p>
    </LoadingAnimationWrapper>
  )
}

export default LoadingAnimation;
