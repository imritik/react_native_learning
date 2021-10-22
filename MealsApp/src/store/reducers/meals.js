import {MEALS} from '../../data/data';
import {
  TOGGLE_FAVORITE,
  SET_FILTERS,
  SET_FAVORITES,
  SET_USER_MEALS,
} from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
  userMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const index = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId,
      );
      if (index >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(index, 1);
        return {...state, favoriteMeals: updatedFavMeals};
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return {...state, favoriteMeals: state.favoriteMeals.concat(meal)};
      }

    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });
      return {...state, filteredMeals: updatedFilteredMeals};

    case SET_FAVORITES:
      const newFavMeals = action.favMeals;
      return {...state, favoriteMeals: newFavMeals};

    case SET_USER_MEALS:
      const newUserMeals = action.loadedUserMeals;
      return {...state, userMeals: newUserMeals};
      
    default:
      return state;
  }
};

export default mealsReducer;
