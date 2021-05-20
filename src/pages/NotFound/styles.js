import styled from 'styled-components';

const ContentNotFoundPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 2rem 0;
    text-align: center;
  }

  button {
    width: 190px;
    a {
      color: white;
      text-decoration: none;
    }
  }
`;

export default ContentNotFoundPageWrapper;