import {StyleSheet} from 'react-native';
import COLORS from '../helpers/colors';

export default StyleSheet.create({
  inputContainer: {
    flex: 1,
    // justifyContent: 'center',
    // paddingTop: '45%',
    alignItems: 'center',
    // backgroundColor: COLORS.PRIMARY_BACKGROUND_COLOR,
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  button: {
    paddingVertical: 9,
    height: 40,
  },
  buttonText: {
    fontSize: 16,
  },
 
});
