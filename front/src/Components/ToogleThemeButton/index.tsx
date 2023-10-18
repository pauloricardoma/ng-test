import React from 'react';
import useTheme from '../../Hooks/useTheme';
import { Container } from './styles';

function ToogleThemeButton() {
  const { theme, handleToogleTheme } = useTheme();

  return (
    <Container>
      <button
        type="button"
        onClick={handleToogleTheme}
      >
        {theme === 'dark' ? '🌞' : '🌚'}
      </button>
    </Container>
  );
}

export default ToogleThemeButton;
