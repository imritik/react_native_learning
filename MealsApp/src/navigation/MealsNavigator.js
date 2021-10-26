import React, {useEffect, useRef} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import Colors from '../helpers/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Strings from '../helpers/Strings';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import EditMealsScreen from '../screens/User/EditMeal';
import UserMealsScreen from '../screens/User/UserMeals';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import AuthScreen from '../screens/User/AuthScreen';
import {Alert, View, SafeAreaView, Button} from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import * as authActions from '../store/actions/auth';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTitleAlign: 'center',
  headerTintColor: Colors.appBarTitleColor,
};

const MealsStack = createStackNavigator();

const MealsNavigator = () => {
  return (
    <MealsStack.Navigator
      screenOptions={{...defaultStackNavOptions, headerShown: true}}
      initialRouteName="Categories">
      <MealsStack.Screen name="Categories" component={CategoriesScreen} />
      <MealsStack.Screen name="CategoryMeals" component={CategoryMealsScreen} />
      <MealsStack.Screen name="MealDetail" component={MealDetailsScreen} />
    </MealsStack.Navigator>
  );
};

const FavStack = createStackNavigator();

const FavNavigator = () => {
  return (
    <FavStack.Navigator
      screenOptions={defaultStackNavOptions}
      initialRouteName="Favorites">
      <FavStack.Screen name="Favorites" component={FavoritesScreen} />
      <FavStack.Screen name="MealDetail" component={MealDetailsScreen} />
    </FavStack.Navigator>
  );
};

const FiltersStack = createStackNavigator();

const FiltersNavigator = () => {
  return (
    <FiltersStack.Navigator screenOptions={defaultStackNavOptions}>
      <FiltersStack.Screen
        name={Strings.FILTERS_SCREEN_TITLE}
        component={FiltersScreen}
      />
    </FiltersStack.Navigator>
  );
};

const UserMealsStack = createStackNavigator();

const UserMealsNavigator = () => {
  return (
    <UserMealsStack.Navigator screenOptions={defaultStackNavOptions}>
      <UserMealsStack.Screen name="UserMeals" component={UserMealsScreen} />
      <UserMealsStack.Screen name="AddMeals" component={EditMealsScreen} />
    </UserMealsStack.Navigator>
  );
};

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={defaultStackNavOptions}>
      <AuthStack.Screen name="Auth" component={AuthScreen} />
    </AuthStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        ...defaultStackNavOptions,
        tabBarStyle: {
          backgroundColor: Colors.primaryColor,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        headerShown: false,
      }}>
      <BottomTab.Screen
        name={Strings.CATEGORIES_SCREEN_TITLE}
        component={MealsNavigator}
        options={{
          tabBarLabel: Strings.MEALS,
          tabBarIcon: ({color}) => {
            return <Icon name="utensils" size={18} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name={Strings.FAVORITES}
        component={FavNavigator}
        options={{
          tabBarLabel: Strings.FAVORITES,
          tabBarIcon: ({color}) => {
            return <Icon name="star" size={18} color={color} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              icon={() => <Icon name="power-off" />}
              label="Logout"
              onPress={() => dispatch(authActions.logout())}
            />
          </DrawerContentScrollView>
        );
      }}
      screenOptions={{
        drawerActiveTintColor: Colors.accentColor,
        headerShown: false,
      }}>
      <Drawer.Screen
        name={Strings.CATEGORIES_SCREEN_TITLE}
        component={BottomTabNavigator}
        options={{
          drawerLabel: Strings.MEALS,
          drawerIcon: () => <Icon name="utensils" />,
        }}
      />
      <Drawer.Screen
        name={Strings.FILTERS}
        component={FiltersNavigator}
        options={{drawerIcon: () => <Icon name="filter" />}}
      />
      <Drawer.Screen
        name={Strings.UserMeals_ScreenTitle}
        component={UserMealsNavigator}
        options={{
          drawerLabel: Strings.UserMeals_ScreenTitle,
          drawerIcon: () => <Icon name="edit" />,
        }}
      />
    </Drawer.Navigator>
  );
}

const MainNavigator = () => {
  let isAutheticated = useSelector(state => !!state.auth.token);

  // useEffect(() => {
  //   isAutheticated = isAutheticated;
  // }, [isAutheticated]);

  return (
    <NavigationContainer>
      {isAutheticated ? <MyDrawer /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
export default MainNavigator;
