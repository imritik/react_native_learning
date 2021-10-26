import * as yup from 'yup';
import Strings from '../Strings';

export default authFormValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email(Strings.EMAIL_IS_INVALID)
    .required(Strings.EMAIL_IS_REQUIRED),
  password: yup
    .string()
    .min(6, Strings.PASSWORD_MIN_LENGTH)
    .required(Strings.PASS_IS_REQUIRED),
});
