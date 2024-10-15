import { useContext } from 'react';
import { ThemeContext, themes } from './themeContext';

// imports the theme context
export const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // toggles the theme
  return (
    <button onClick={toggleTheme}>
      {theme === themes.dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};
