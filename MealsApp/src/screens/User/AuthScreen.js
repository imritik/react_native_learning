import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Strings from '../../helpers/Strings';
import ActivityIndicatorView from '../../components/ActivityIndicatorView';
import {
  View,
  TextInput,
  Text,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import {Button} from 'react-native-elements';
import styles from '../../styles/AuthScreenStyle';
import AppStyle from '../../styles/AppStyle';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import authFormValidationSchema from '../../helpers/Validations/authFormValidations';
import {TouchableOpacity} from 'react-native';
import * as authActions from '../../store/actions/auth';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [formMarginTop, setFormMarginTop] = useState(
    Dimensions.get('window').height * 0.2,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert(Strings.ERROR_OCCURED, error, [{text: 'Okay'}]);
    }
  }, [error]);

  useEffect(() => {
    const tryLogin = async () => {
      let userData;
      try {
        userData = await AsyncStorage.getItem('userData');
      } catch (err) {
        setError(err.message);
      }
      if (!userData) {
        return;
      }
      const userCredentials = JSON.parse(userData);
      setCurrentUser(userCredentials);
      const {token, userId, expiryDate} = userCredentials;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      // dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);

  useEffect(() => {
    const updateLayout = () => {
      if (Dimensions.get('window').height < 500) {
        setFormMarginTop(Dimensions.get('window').height * 0.1);
      } else {
        setFormMarginTop(Dimensions.get('window').height * 0.2);
      }
    };

    dimensionsSub = Dimensions.addEventListener('change', updateLayout);

    return () => {
      dimensionsSub?.remove();
    };
  });

  //formik
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    isValid,
    values,
  } = useFormik({
    validationSchema: authFormValidationSchema,
    initialValues: {
      email: currentUser ? currentUser.email : '',
      password: currentUser ? currentUser.password : '',
    },
    enableReinitialize: true,
    onSubmit: (values, {resetForm}) => {
      submitFormData();
    },
  });

  const submitFormData = async () => {
    setIsLoading(true);
    let action;
    if (isSignup) {
      action = authActions.signup(values.email, values.password);
    } else {
      action = authActions.login(values.email, values.password);
    }
    setError(null);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: Strings.LOGIN,
    });
  });

  return (
    <SafeAreaView style={AppStyle.screenContainer}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps={'handled'}
        enableResetScrollToCoords={false}
        style={{flex: 1}}
        keyboardDismissMode="on-drag">
        <View style={{...styles.authFormContainer, marginTop: formMarginTop}}>
          <View style={styles.forms}>
            <TextInput
              name="email"
              style={{
                ...styles.formTextInput,
                ...Platform.select({
                  ios: {
                    height: '20%',
                  },
                }),
              }}
              placeholder={Strings.ENTER_EMAIL}
              keyboardType="default"
              autoCapitalize="sentences"
              returnKeyType="next"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={AppStyle.errorText}>{errors.email}</Text>
            )}
            <TextInput
              name="password"
              secureTextEntry={true}
              placeholder={Strings.ENTER_PASSWORD}
              style={{
                ...styles.formTextInput,
                ...Platform.select({
                  ios: {
                    height: '20%',
                  },
                }),
              }}
              returnKeyType="next"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text style={AppStyle.errorText}>{errors.password}</Text>
            )}
            <View>
              {isLoading ? (
                <ActivityIndicatorView />
              ) : (
                <Button
                  title={isSignup ? Strings.SIGNUP : Strings.LOGIN}
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              )}
            </View>
            <View>
              <TouchableOpacity
                style={styles.switchButtonView}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}>
                <Text>
                  Switch to {isSignup ? Strings.LOGIN : Strings.SIGNUP}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AuthScreen;
