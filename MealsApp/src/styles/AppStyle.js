import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {ThemeContext} from '../helpers/theme/ThemeProvider';

export const useAppStyle = () => {
  const {isDark, theme, toggle} = useContext(ThemeContext);
  const styles = StyleSheet.create({
    emptyListContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    screenContainer: {
      flex: 1,
    },
    errorText: {
      color: theme.errorTextColor,
      fontSize: 12,
      textAlign: 'center',
    },
    splashScreen: {
      flex: 1,
      backgroundColor: theme.accentColor,
    },
    mapPreview: {
      marginBottom: 10,
      width: '100%',
      height: 150,
      borderColor: '#ccc',
      borderWidth: 1,
    },
    textInputColor: {
      color: theme.primaryTextColor,
    },
    mealItemTextColor: {
      color: 'black',
    },
  });
  return {styles, theme,isDark};
};
