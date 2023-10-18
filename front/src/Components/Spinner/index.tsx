import React from 'react';

import { StyledSpinner } from './styles';

interface ISpinner {
  size: number;
}

function Spinner({ size }: ISpinner) {
  return <StyledSpinner size={size} />;
}

export default Spinner;
