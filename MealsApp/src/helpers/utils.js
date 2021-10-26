// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as authActions from '../store/actions/auth';
// import {useDispatch} from 'react-redux';

// const dispatch = useDispatch();
// export default  tryLogin = async () => {
//   const userData = await AsyncStorage.getItem('userData');
//   if (!userData) {
//     // Alert.alert('no data');
//     // NavigationActions.navigate({routeName: 'Auth'});
//     return;
//   }

//   const userCredentials = JSON.parse(userData);
//   const {token, userId, expiryDate} = userCredentials;
//   const expirationDate = new Date(expiryDate);

//   if (expirationDate <= new Date() || !token || !userId) {
//     // navigation.navigate('Auth');
//     return;
//   }

//   const expirationTime = expirationDate.getTime() - new Date().getTime();

//   //   navigation.navigate('Categories');
//   //   <MealsNavigator />;

//   dispatch(authActions.authenticate(userId, token, expirationTime));
// };
