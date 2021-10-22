import Strings from '../../helpers/Strings';
import URLS from '../../helpers/URLS';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_FAVORITES = 'SET_FAVORITES';
export const SET_USER_MEALS = 'SET_USER_MEALS';

export const toggleFavorite = id => {
  return {type: TOGGLE_FAVORITE, mealId: id};
};
export const setFilters = filtersValue => {
  return {type: SET_FILTERS, filters: filtersValue};
};

export const saveFavoriteMeals = favMeals => {
  return async dispatch => {
    try {
      const response = await fetch(URLS.FAV_MEALS_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favMeals),
      });
      if (!response.ok) {
        throw new Error(Strings.SOMETHING_WENT_WRONG);
      }
      fetchFavoriteMeals();
    } catch (err) {
      throw err;
    }
  };
};

export const fetchFavoriteMeals = () => {
  return async dispatch => {
    try {
      const response = await fetch(URLS.FAV_MEALS_URL);
      if (!response.ok) {
        throw new Error(Strings.SOMETHING_WENT_WRONG);
      }
      const resData = await response.json();
      const loadedFavMeals = resData.favMeals;
      dispatch({type: SET_FAVORITES, favMeals: loadedFavMeals});
    } catch (err) {
      throw err;
    }
  };
};

export const fetchUserMeals = () => {
  return async dispatch => {
    try {
      const response = await fetch(URLS.USER_MEALS_URL);
      if (!response.ok) {
        throw new Error(Strings.SOMETHING_WENT_WRONG);
      }
      const resData = await response.json();
      const loadedUserMeals = resData.userMeals;
      dispatch({type: SET_USER_MEALS, loadedUserMeals: loadedUserMeals});
    } catch (err) {
      throw err;
    }
  };
};

export const saveUserMeals = userMealsData => {
  return async dispatch => {
    try {
      const response = await fetch(URLS.USER_MEALS_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMealsData),
      });
      if (!response.ok) {
        throw new Error(Strings.SOMETHING_WENT_WRONG);
      }
      fetchUserMeals();
    } catch (err) {
      throw err;
    }
  };
};
