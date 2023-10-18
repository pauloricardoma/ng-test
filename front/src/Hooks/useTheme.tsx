import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import dark from '../Assets/styles/themes/dark';
import light from '../Assets/styles/themes/light';
import { ThemeActions } from '../Store/Theme/Theme.action';

function useTheme() {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(initialLocaltheme());

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    dispatch(ThemeActions.toogleTheme(theme === 'dark' ? dark : light));
    dispatch(ThemeActions.toogleThemeString(theme));
  }, [theme]);

  function initialLocaltheme() {
    let theme = 'light';
    try {
      theme = JSON.parse(localStorage.getItem('theme') || '');
      dispatch(ThemeActions.toogleThemeString(theme));
    } catch (err) {
      console.log('Error toogle theme -> ', err);
    }
    return theme;
  }

  function handleToogleTheme() {
    setTheme(prevState => prevState === 'dark' ? 'light' : 'dark');
  }

  return { theme, handleToogleTheme };
}

export default useTheme;
