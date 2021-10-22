import {StyleSheet} from 'react-native';
import Colors from '../helpers/Colors';
export default StyleSheet.create({
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
  errorText:{
    color:Colors.errorTextColor,
    fontSize:12,
    textAlign:'center'
  }
});
