import React, {useCallback, useEffect, useState} from 'react';
import MealList from '../components/MealList';
import Strings from '../helpers/Strings';
import {useDispatch, useSelector} from 'react-redux';
import EmptyList from '../components/EmptyList';
import * as mealsAction from '../store/actions/meals';
import ActivityIndicatorView from '../components/ActivityIndicatorView';
import {SafeAreaView} from 'react-native';
import AppStyle from '../styles/AppStyle';
const FavoritesScreen = ({navigation}) => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const loadFavoriteMeals = useCallback(async () => {
    setError(null);
    try {
      dispatch(mealsAction.fetchFavoriteMeals());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadFavoriteMeals().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadFavoriteMeals]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('focus', loadFavoriteMeals);
    return willFocusSub;
  });

  if (error) {
    return <EmptyList message={error} />;
  }

  if (favMeals.length === 0 || !favMeals) {
    return <EmptyList message={Strings.EMPTY_FAV_LIST} />;
  }
  return (
    <SafeAreaView style={AppStyle.screenContainer}>
      {isLoading ? (
        <ActivityIndicatorView />
      ) : (
        <MealList MealList={favMeals} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};
export default FavoritesScreen;
