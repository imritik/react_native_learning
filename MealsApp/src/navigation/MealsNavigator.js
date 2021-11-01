import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import CategoriesScreen from '../screens/Meals/CategoriesScreen';
import CategoryMealsScreen from '../screens/Meals/CategoryMealsScreen';
import MealDetailsScreen from '../screens/Meals/MealDetailsScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Strings from '../helpers/Strings';
import FavoritesScreen from '../screens/Meals/FavoritesScreen';
import FiltersScreen from '../screens/Meals/FiltersScreen';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import EditMealsScreen from '../screens/User/EditMeal';
import UserMealsScreen from '../screens/User/UserMeals';
import {useSelector, useDispatch} from 'react-redux';
import AuthScreen from '../screens/User/AuthScreen';
import * as authActions from '../store/actions/auth';
import PlacesScreen from '../screens/Places/PlacesScreen';
import AddPlaceScreen from '../screens/Places/AddPlaceSceen';
import MapScreen from '../components/MapScreen';
import {useColorScheme} from 'react-native-appearance';
import {useAppStyle} from '../styles/AppStyle';

const defaultStackNavOptions = {
  headerTitleAlign: 'center',
};

const MealsStack = createStackNavigator();

const MealsNavigator = () => {
  return (
    <MealsStack.Navigator
      screenOptions={{
        ...defaultStackNavOptions,
        headerShown: true,
        headerStyle: {
          backgroundColor: useAppStyle().theme.primaryColor,
        },
        headerTintColor: useAppStyle().theme.appBarTitleColor,
      }}
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
      screenOptions={{
        ...defaultStackNavOptions,
        headerStyle: {
          backgroundColor: useAppStyle().theme.primaryColor,
        },
        headerTintColor: useAppStyle().theme.appBarTitleColor,
      }}
      initialRouteName="Favorites">
      <FavStack.Screen name="Favorites" component={FavoritesScreen} />
      <FavStack.Screen name="MealDetail" component={MealDetailsScreen} />
    </FavStack.Navigator>
  );
};

const FiltersStack = createStackNavigator();

const FiltersNavigator = () => {
  return (
    <FiltersStack.Navigator
      screenOptions={{
        ...defaultStackNavOptions,
        headerStyle: {
          backgroundColor: useAppStyle().theme.primaryColor,
        },
        headerTintColor: useAppStyle().theme.appBarTitleColor,
      }}>
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
    <UserMealsStack.Navigator
      screenOptions={{
        ...defaultStackNavOptions,
        headerStyle: {
          backgroundColor: useAppStyle().theme.primaryColor,
        },
        headerTintColor: useAppStyle().theme.appBarTitleColor,
      }}>
      <UserMealsStack.Screen name="UserMeals" component={UserMealsScreen} />
      <UserMealsStack.Screen name="AddMeals" component={EditMealsScreen} />
    </UserMealsStack.Navigator>
  );
};

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        ...defaultStackNavOptions,
        headerStyle: {
          backgroundColor: useAppStyle().theme.primaryColor,
        },
        headerTintColor: useAppStyle().theme.appBarTitleColor,
      }}>
      <AuthStack.Screen name="Auth" component={AuthScreen} />
    </AuthStack.Navigator>
  );
};

const PlacesStack = createStackNavigator();

const PlaceNavigator = () => {
  return (
    <PlacesStack.Navigator
      screenOptions={{
        ...defaultStackNavOptions,
        headerStyle: {
          backgroundColor: useAppStyle().theme.primaryColor,
        },
        headerTintColor: useAppStyle().theme.appBarTitleColor,
      }}>
      <PlacesStack.Screen name="Places" component={PlacesScreen} />
      <PlacesStack.Screen name="AddPlace" component={AddPlaceScreen} />
      <PlacesStack.Screen name="Map" component={MapScreen} />
    </PlacesStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        ...defaultStackNavOptions,
        tabBarStyle: {
          backgroundColor: useAppStyle().theme.primaryColor,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: useAppStyle().theme.iconInActiveColor,
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
      <BottomTab.Screen
        name={Strings.PLACES}
        component={PlaceNavigator}
        options={{
          tabBarLabel: Strings.PLACES,
          tabBarIcon: ({color}) => {
            return <Icon name="map" size={18} color={color} />;
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
              icon={() => (
                <Icon
                  name="power-off"
                  color={useAppStyle().theme.primaryIconColor}
                />
              )}
              label="Logout"
              onPress={() => dispatch(authActions.logout())}
            />
          </DrawerContentScrollView>
        );
      }}
      screenOptions={{
        drawerActiveTintColor: useAppStyle().theme.accentColor,
        headerShown: false,
      }}>
      <Drawer.Screen
        name={Strings.CATEGORIES_SCREEN_TITLE}
        component={BottomTabNavigator}
        options={{
          drawerLabel: Strings.MEALS,

          drawerIcon: () => (
            <Icon
              name="utensils"
              color={useAppStyle().theme.primaryIconColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={Strings.FILTERS}
        component={FiltersNavigator}
        options={{
          drawerIcon: () => (
            <Icon name="filter" color={useAppStyle().theme.primaryIconColor} />
          ),
        }}
      />
      <Drawer.Screen
        name={Strings.UserMeals_ScreenTitle}
        component={UserMealsNavigator}
        options={{
          drawerLabel: Strings.UserMeals_ScreenTitle,
          drawerIcon: () => (
            <Icon name="edit" color={useAppStyle().theme.primaryIconColor} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const MainNavigator = () => {
  let isAutheticated = useSelector(state => !!state.auth.token);
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme == 'dark' ? DarkTheme : DefaultTheme}>
      {isAutheticated ? <MyDrawer /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
export default MainNavigator;
