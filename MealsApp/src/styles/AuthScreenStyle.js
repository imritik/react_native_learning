import {useContext} from 'react';
import {Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import {ThemeContext} from '../helpers/theme/ThemeProvider';

export const useStyle = () => {
  const {isDark, theme, toggle} = useContext(ThemeContext);
  const styles = StyleSheet.create({
    forms: {},
    formTextInput: {
      backgroundColor: theme.inputBackground,
      width: '100%',
      borderRadius: 10,
      textAlign: 'center',
      marginVertical: 10,
      color: theme.primaryTextColor,
    },
    authFormContainer: {
      marginHorizontal: '5%',
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 8,
      elevation: 10,
      borderRadius: 10,
      backgroundColor: theme.cardBgColor,
      padding: 25,
      marginBottom: 20,
    },
    switchButtonView: {
      alignItems: 'center',
      marginVertical: 10,
      backgroundColor: theme.accentColor,
      padding: 10,
    },
    authenticateBtn: {
      alignSelf: 'center',
      backgroundColor: 'wheat',
      marginTop: Platform.OS == 'android' ? 15 : 0,
      marginBottom: Platform.OS == 'ios' ? 15 : 0,
    },
  });
  return styles;
};
