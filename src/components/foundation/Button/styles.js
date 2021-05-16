import styled from 'styled-components';

const DefaultButton = styled.button`  
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: .5rem 1rem;
  cursor: pointer;
  background-color: #2FC18C;
  transition: background-color 1s ease-in-out;   

  &:hover {
    background-color: rgba(47, 193, 140, .7);
    transition: opacity 1s;
  }

  &:disabled {
    cursor: auto;    
    transition: unset;
  }

  &:active {
    background-color: rgba(47, 193, 140, .7);
    transform: translateY(2px);
  }  
`

export default DefaultButton;