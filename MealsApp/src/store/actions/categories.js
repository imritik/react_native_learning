import Strings from '../../helpers/Strings';
import URLS from '../../helpers/URLS';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const response = await fetch(URLS.GET_CATEGORIES_URL);

      if (!response.ok) {
        throw new Error(Strings.SOMETHING_WENT_WRONG);
      }
      const resData = await response.json();
      const loadedCategories = resData.categories;
      dispatch({type: SET_CATEGORIES, categories: loadedCategories});
    } catch (err) {
      throw err;
    }
  };
};
