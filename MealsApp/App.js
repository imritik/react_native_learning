import React from 'react';
import {enableScreens} from 'react-native-screens';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import MealsNavigator from './src/navigation/MealsNavigator';
import {Provider} from 'react-redux';
import mealsReducer from './src/store/reducers/meals';
import ReduxThunk from 'redux-thunk';
import categoryReducer from './src/store/reducers/categories';
import {StatusBar, LogBox} from 'react-native';
import Colors from './src/helpers/Colors';
import authReducer from './src/store/reducers/auth';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
  categories: categoryReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={Colors.primaryColor}
        barStyle="light-content"
      />
      <MealsNavigator />
    </Provider>
  );
}
