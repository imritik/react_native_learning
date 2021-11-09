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
import {useStyle} from '../../styles/AuthScreenStyle';
import {useAppStyle} from '../../styles/AppStyle';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import authFormValidationSchema from '../../helpers/Validations/authFormValidations';
import {TouchableOpacity} from 'react-native';
import * as authActions from '../../store/actions/auth';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IconButton} from 'react-native-paper';
import * as utils from '../../helpers/Utils/utils';
import {useTheme} from 'react-navigation';

const AuthScreen = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [formMarginTop, setFormMarginTop] = useState(
    Dimensions.get('window').height * 0.2,
  );

  const dispatch = useDispatch();
  const {colors} = useTheme();

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
      if (isSignup) {
        setCurrentUser(null);
        return;
      }
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
  }, [dispatch, isSignup]);

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
      dispatch(action);
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

  const authenticateButtonHandler = async () => {
    utils
      .touchIdAuth()
      .then(res => {
        submitFormData();
      })
      .catch(err => {
        console.log(err);
        if (err.name == 'Touch ID Error') {
          Alert.alert(Strings.NO_BIOMETRICS_FOUND);
        } else {
          Alert.alert(err.message);
        }
      });
  };

  return (
    <SafeAreaView style={useAppStyle().styles.screenContainer}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps={'handled'}
        enableResetScrollToCoords={false}
        keyboardDismissMode="on-drag">
        <View
          style={{
            ...useStyle().authFormContainer,
            marginTop: formMarginTop,
          }}>
          <View style={useStyle().forms}>
            <TextInput
              name="email"
              style={{
                ...useStyle().formTextInput,
                ...Platform.select({
                  ios: {
                    height: '20%',
                  },
                }),
              }}
              placeholder={Strings.ENTER_EMAIL}
              placeholderTextColor={useAppStyle().theme.primaryTextColor}
              keyboardType="default"
              autoCapitalize="sentences"
              returnKeyType="next"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={useAppStyle().styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              name="password"
              secureTextEntry={true}
              placeholder={Strings.ENTER_PASSWORD}
              placeholderTextColor={useAppStyle().theme.primaryTextColor}
              style={{
                ...useStyle().formTextInput,
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
              <Text style={useAppStyle().styles.errorText}>
                {errors.password}
              </Text>
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
                style={useStyle().switchButtonView}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                  // setCurrentUser(null);
                }}>
                <Text style={{color: useAppStyle().theme.inputBackground}}>
                  Switch to {isSignup ? Strings.LOGIN : Strings.SIGNUP}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <IconButton
            icon="fingerprint"
            size={30}
            color={useAppStyle().theme.placeholderTextColor}
            onPress={authenticateButtonHandler}
            style={useStyle().authenticateBtn}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AuthScreen;
