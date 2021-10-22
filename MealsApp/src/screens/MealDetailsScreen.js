import {Alert, Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Strings from '../helpers/Strings';
import {useSelector, useDispatch} from 'react-redux';
import React, {useCallback, useEffect} from 'react';
import {toggleFavorite} from '../store/actions/meals';
import styles from '../styles/MealDetailsStyle';
import {IconButton} from 'react-native-paper';
import * as mealsAction from '../store/actions/meals';
import AppStyle from '../styles/AppStyle';
const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDetailsScreen = ({route, navigation}) => {
  const availabelMeals = useSelector(state => state.meals.meals);
  const {mealId, mealTitle, isFav, toggleFav} = route.params;
  const selectedMeal = availabelMeals.find(meal => meal.id === mealId);
  const currentMealIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId),
  );
  const currentFavMeals = useSelector(state => state.meals.favoriteMeals);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: mealTitle,
      headerRight: () => (
        <IconButton
          icon={isFav ? 'star' : 'star-outline'}
          color="white"
          onPress={toggleFav}
        />
      ),
    });
  });

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
    const newFavMeals = handleFavMeals();
    let saveFavMealsReq = {favMeals: newFavMeals};
    dispatch(mealsAction.saveFavoriteMeals(saveFavMealsReq));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({toggleFav: toggleFavoriteHandler});
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    navigation.setParams({isFav: currentMealIsFavorite});
  }, [currentMealIsFavorite]);

  const handleFavMeals = () => {
    let favArray = currentFavMeals;
    if (favArray.some(meal => meal.id === selectedMeal.id)) {
      favArray = favArray.filter(meal => meal.id != selectedMeal.id);
    } else {
      favArray = [...favArray, selectedMeal];
    }
    return favArray;
  };
  return (
    <SafeAreaView style={AppStyle.screenContainer}>
      <ScrollView>
        <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
        <View style={styles.details}>
          <Text>{selectedMeal.duration}</Text>
          <Text>{selectedMeal.complexity.toUpperCase()}</Text>
          <Text>{selectedMeal.affordability.toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>{Strings.INGREDIENTS}</Text>
        {selectedMeal.ingredients.map(item => (
          <ListItem key={item}>{item}</ListItem>
        ))}
        <Text style={styles.title}>{Strings.STEPS}</Text>
        {selectedMeal.steps.map(step => (
          <ListItem key={step}>{step}</ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default MealDetailsScreen;
