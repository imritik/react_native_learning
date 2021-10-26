import {Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import Colors from '../helpers/Colors';
export default StyleSheet.create({
  forms: {
    flex: 1,
  },
  formTextInput: {
    backgroundColor: 'whitesmoke',
    width: '100%',
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 10,
  },
  authFormContainer: {
    marginHorizontal: '5%',
    height: Platform.OS == 'ios' ? '70%' : '100%',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
  },
  switchButtonView: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: Colors.accentColor,
    padding: 10,
  },
});
