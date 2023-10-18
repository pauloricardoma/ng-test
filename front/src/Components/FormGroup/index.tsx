import React from 'react';
import { Container } from './styles';

interface IFormGroup {
  title?: string;
  error?: string;
  children: React.ReactNode;
}

function FormGroup({ title, children, error }: IFormGroup) {
  return (
    <Container>
      <span>{title}</span>
      {children}
      {error && <small>{error}</small>}
    </Container>
  );
}

export default FormGroup;
