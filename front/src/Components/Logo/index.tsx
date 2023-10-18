import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Text } from './styles';

function Logo() {
  return (
    <Link to="/home" style={{ textDecoration: 'none' }}>
      <Container>
        <Text>NG.Cash</Text>
      </Container>
    </Link>
  );
}

export default Logo;
