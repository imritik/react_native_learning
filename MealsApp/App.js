import React from 'react';
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
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {ThemeProvider} from './src/helpers/theme/ThemeProvider';
import {useAppStyle} from './src/styles/AppStyle';
enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
  categories: categoryReducer,
  auth: authReducer,
  places: placesReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <AppearanceProvider>
      <ThemeProvider>
        <Provider store={store}>
          <StatusBar
            backgroundColor={useAppStyle().theme.primaryColor}
            barStyle="light-content"
          />
          <MealsNavigator />
        </Provider>
      </ThemeProvider>
    </AppearanceProvider>
  );
}
