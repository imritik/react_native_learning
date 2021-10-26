import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
import Strings from '../../helpers/Strings';
import URLS from '../../helpers/URLS';

let timer;
export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({type: AUTHENTICATE, userId: userId, token: token});
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(URLS.LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = Strings.SOMETHING_WENT_WRONG;
      if (errorId == 'EMAIL_NOT_FOUND') {
        message = Strings.EMAIL_NOT_FOUND;
      } else if (errorId == 'INVALID_PASSWORD') {
        message = Strings.INVALID_PASSWORD;
      }
      throw new Error(message);
    }

    const resData = await response.json();

    if (!resData.localId || !resData.idToken || !resData.expiresIn) {
      throw new Error(Strings.SOMETHING_WENT_WRONG);
    }

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
      ),
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    );
    saveDataToStorage(
      email,
      password,
      resData.idToken,
      resData.localId,
      expirationDate,
    );
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(URLS.SIGNUP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = Strings.SOMETHING_WENT_WRONG;
      if (errorId == 'EMAIL_EXISTS') {
        message = Strings.EMAIL_ALREADY_EXISTS;
      }
      throw new Error(message);
    }
    const resData = await response.json();
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
      ),
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    );
    saveDataToStorage(
      email,
      password,
      resData.idToken,
      resData.localId,
      expirationDate,
    );
  };
};

const saveDataToStorage = async (
  email,
  password,
  token,
  userId,
  expirationDate,
) => {
  try {
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        email: email,
        password: password,
        token: token,
        userId: userId,
        expiryData: expirationDate,
      }),
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

export const logout = () => {
  clearLogoutTimer();
  // AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
