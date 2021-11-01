import React, {useCallback, useEffect, useState} from 'react';
import MealList from '../../components/MealList';
import Strings from '../../helpers/Strings';
import {useDispatch, useSelector} from 'react-redux';
import EmptyList from '../../components/EmptyList';
import * as mealsAction from '../../store/actions/meals';
import ActivityIndicatorView from '../../components/ActivityIndicatorView';
import {IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native';
import {useAppStyle} from '../../styles/AppStyle';
const UserMealsScreen = ({navigation}) => {
  const userMeals = useSelector(state => state.meals.userMeals);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const loadUserMeals = useCallback(async () => {
    setError(null);
    try {
      dispatch(mealsAction.fetchUserMeals());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadUserMeals().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadUserMeals,userMeals]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('focus', loadUserMeals);
    return willFocusSub;
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="menu"
          color="white"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      ),
      headerTitle: Strings.UserMeals_ScreenTitle,
      headerRight: () => (
        <IconButton
          icon="plus"
          color="white"
          onPress={() => {
            navigation.navigate('AddMeals', {mealId: -1});
          }}
        />
      ),
    });
  });

  if (error) {
    return <EmptyList message={error} />;
  }

  if (isLoading) {
    <ActivityIndicatorView />;
  }

  if (userMeals.length === 0 || !userMeals) {
    return <EmptyList message={Strings.EMPTY_USER_MEAL_LIST} />;
  }
  return (
    <SafeAreaView style={useAppStyle().styles.screenContainer}>
      <MealList
        isUserMeals={true}
        MealList={userMeals}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};
export default UserMealsScreen;
