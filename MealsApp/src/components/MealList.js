import React, {useState} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import MealItem from './MealItem';
import styles from '../styles/MealItemStyle';
import {useDispatch, useSelector} from 'react-redux';
import Strings from '../helpers/Strings';
import * as mealActions from '../store/actions/meals';
import ActivityIndicatorView from './ActivityIndicatorView';
import CustomDialogBox from './CustomDialogBox';

const MealList = props => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
  const userMeals = useSelector(state => state.meals.userMeals);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const deleteMealHandler = id => {
    Alert.alert(Strings.ARE_YOU_SURE, Strings.DELETE_THIS_ITEM, [
      {text: Strings.NO, style: 'default'},
      {
        text: Strings.YES,
        style: 'destructive',
        onPress: () => {
          let newUserMeals = userMeals;
          let index = newUserMeals.findIndex(meal => meal.id === id);
          if (index != -1) {
            newUserMeals.splice(index, 1);
          }
          let newUserMealsReq = {userMeals: newUserMeals};
          try {
            dispatch(mealActions.saveUserMeals(newUserMealsReq));
          } catch (err) {
            throw err;
          }
        },
      },
    ]);
  };

  const renderMealItem = itemData => {
    const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelect={() => {
          props.navigation.navigate('MealDetail', {
            mealId: itemData.item.id,
            mealTitle: itemData.item.title,
            isFav: isFavorite,
          });
        }}
        isUserMeals={props.isUserMeals}
        onEditClick={() => {
          props.navigation.navigate('AddMeals', {mealId: itemData.item.id});
        }}
        onDelete={deleteMealHandler.bind(this, itemData.item.id)}
      />
    );
  };

  if (isLoading) {
    <ActivityIndicatorView />;
  }

  return (
    <View style={styles.list}>
      <FlatList
        data={props.MealList}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={styles.listItem}
      />
    </View>
  );
};

export default MealList;
