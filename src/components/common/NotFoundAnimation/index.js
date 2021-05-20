import React from 'react';
import Lottie from 'react-lottie';
import notFoundAnimation from '../../../themes/animations/NotFoundYoda/NotFoundYoda.json';
import NotFoundWrapper from './styles';

const options = {
  loop: true,
  autoplay: true,
  animationData: notFoundAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }  
}

function NotFoundAnimation() {
  return (
    <NotFoundWrapper>
      <Lottie
        options={options}
        height={300}
        width={300}
      />      
    </NotFoundWrapper>
  )
}

export default NotFoundAnimation;
