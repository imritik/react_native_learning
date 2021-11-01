import * as React from 'react';
import {useColorScheme} from 'react-native-appearance';
import {lightColors, darkColors} from './colorTheme';

const initialState = {
  isDark: false,
  theme: lightColors,
  toggle: () => {},
};

const ThemeContext = React.createContext(initialState);

function ThemeProvider({children}) {
  
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = React.useState(colorScheme === 'dark');

  React.useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const toggle = () => {
    setIsDark(colorScheme === 'dark');
  };

  const theme = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{isDark, theme, toggle}}>
      {children}
    </ThemeContext.Provider>
  );
}

export {ThemeProvider, ThemeContext};
