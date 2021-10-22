import {SET_CATEGORIES} from '../actions/categories';
import Category from '../../models/category';

const initialState = {
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        categories: action.categories,
      };
  }
  return state;
};
export default categoryReducer;
