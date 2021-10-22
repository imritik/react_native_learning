import * as yup from 'yup';
import Strings from '../Strings';

export default editMealFormValidationSchema = yup.object().shape({
  title: yup.string().required(Strings.MEAL_TITLE_IS_REQUIRED),
  steps: yup.string().required(Strings.MEAL_STEPS_ARE_REQUIRED),
});
