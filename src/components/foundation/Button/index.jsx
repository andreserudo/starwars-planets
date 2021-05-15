import React from 'react';
import Proptypes from 'prop-types';
import DefaultButton from './styles';

function Button({ children }) {
  return (
    <DefaultButton>
      { children }
    </DefaultButton>    
  )
}

Button.propTypes = {
  children: Proptypes.string.isRequired,
}

export default Button;