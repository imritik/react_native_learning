import React, {useEffect, useState} from 'react';
import {enableScreens} from 'react-native-screens';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import MealsNavigator from './src/navigation/MealsNavigator';
import {Provider} from 'react-redux';
import mealsReducer from './src/store/reducers/meals';
import ReduxThunk from 'redux-thunk';
import categoryReducer from './src/store/reducers/categories';
import {StatusBar, LogBox} from 'react-native';
import authReducer from './src/store/reducers/auth';
import placesReducer from './src/store/reducers/places';
import {AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider} from './src/helpers/theme/ThemeProvider';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {useColorScheme} from 'react-native-appearance';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
  categories: categoryReducer,
  auth: authReducer,
  places: placesReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
LogBox.ignoreAllLogs();

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken();
  }
};

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log(fcmToken);
  }
};

export default function App() {
  const [hasNotificationFlag, setHasNotificationFlag] = useState(false);

  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      //notification caused app to open from background state
      setHasNotificationFlag(true);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        setHasNotificationFlag(true);
        //notification caused app to open from quit state
      });
  }, []);

  useEffect(() => {
    requestUserPermission();
    const fcmUnsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        channelId: 101,
      });
    });
    return fcmUnsubscribe;
  }, []);
  return (
    <AppearanceProvider>
      <ThemeProvider>
        <Provider store={store}>
          <StatusBar
            backgroundColor={isDark ? '#1f1f1f' : 'dodgerblue'}
            barStyle="light-content"
          />
          <MealsNavigator hasNotificationFlag={hasNotificationFlag} />
        </Provider>
      </ThemeProvider>
    </AppearanceProvider>
  );
}
