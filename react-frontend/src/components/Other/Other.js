import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px;
  width: 80%;
  border: 1px solid black;
  margin: 0 auto;
`;

const Other = () => {
  return (
    <Container>
      <div className="row">
        <h2>Create by mood</h2>
      </div>
    </Container>
  );
};

export default Other;