import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStyle from '../styles/AppStyle';
import ActivityIndicatorView from '../components/ActivityIndicatorView';
import * as authActions from '../store/actions/auth';
import MealsNavigator from '../navigation/MealsNavigator';
import {View} from 'react-native';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Alert} from 'react-native';
import {NavigationActions} from 'react-navigation';
const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        // Alert.alert('no data');
        // NavigationActions.navigate({routeName: 'Auth'});
        return;
      }

      const userCredentials = JSON.parse(userData);
      const {token, userId, expiryDate} = userCredentials;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        // navigation.navigate('Auth');
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      //   navigation.navigate('Categories');
      <MealsNavigator />;

      dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <SafeAreaView style={AppStyle.splashScreen}>
      <View>
        <Text
          style={{textAlign: 'center', marginVertical: '46%', fontSize: 30}}>
          Meals App
        </Text>
        <ActivityIndicatorView />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
