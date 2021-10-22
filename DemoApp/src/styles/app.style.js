import {StyleSheet} from 'react-native';
import COLORS from '../helpers/colors';
export default StyleSheet.create({
  screen: {
    flex: 1,
    padding: 50,
    backgroundColor: COLORS.PRIMARY_BACKGROUND_COLOR,
  },
  emptyListMessage: {
    flex: 1,
    alignItems: 'center',
  },
  addGoalBtnContainer: {
    marginVertical: 10,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_BACKGROUND_COLOR,
  },
  grayText: {
    color: 'gray',
    fontSize: 22,
    fontFamily: 'SourceSerifPro-Light',
    // fontFamily: 'Caveat-Regular',
  },
  appBar: {
    backgroundColor: COLORS.PRIMARY_COLOR,
  },
  appBarTitle: {
    alignItems: 'center',
  },
  outerContainer: {
    flex: 1,
  },
  customBtn: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
  },
  customBtnText: {
    color: COLORS.PRIMARY_TEXT_COLOR,
    fontSize: 18,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: 'black',
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
