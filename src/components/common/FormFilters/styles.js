import styled from 'styled-components';

const FormFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    margin-top: 1rem;
    label {
      display: flex;
      flex-direction: column;
      color: white;

      &:first-of-type {
        margin-right: .4rem;
      }

      &:last-of-type {
        margin-left: .4rem;
      }
    }

    button {
      margin-left: .8rem;
    }
  }

  input {
    text-align: right;
  }
`;

const FormErrorMessage = styled.p`
  align-self: center;
  color: white;
  margin-top: .5rem;
`;

export { FormFilterWrapper, FormErrorMessage };