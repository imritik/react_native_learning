import React from 'react';
import MealList from '../components/MealList';
import EmptyList from '../components/EmptyList';
import Strings from '../helpers/Strings';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native';
import AppStyle from '../styles/AppStyle';

const CategoryMealsSceeen = ({route, navigation}) => {
  const {categoryId} = route.params;
  const availableMeals = useSelector(state => state.meals.filteredMeals);
  const availableCategories = useSelector(state => state.categories.categories);
  const selectedCategory = availableCategories.find(
    cat => cat.id === categoryId,
  );

  const mealsToBeDisplayed = availableMeals.filter(
    meal => meal.categoryIds.indexOf(categoryId) >= 0,
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: selectedCategory.title,
    });
  });

  if (mealsToBeDisplayed.length === 0) {
    return <EmptyList message={Strings.EMPTY_MEALS_LIST} />;
  }
  return (
    <SafeAreaView style={AppStyle.screenContainer}>
      <MealList MealList={mealsToBeDisplayed} navigation={navigation} />
    </SafeAreaView>
  );
};
export default CategoryMealsSceeen;
