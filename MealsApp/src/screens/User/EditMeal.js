import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CustomDialogBox from '../../components/CustomDialogBox';
import Strings from '../../helpers/Strings';
import ActivityIndicatorView from '../../components/ActivityIndicatorView';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
  SafeAreaView,
} from 'react-native';
import {Button} from 'react-native-elements';
import styles from '../../styles/EditMealsStyle';
import AppStyle from '../../styles/AppStyle';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useFormik} from 'formik';
import editMealFormValidation from '../../helpers/Validations/editMealFormValidation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as mealActions from '../../store/actions/meals';

const EditMealsScreen = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [pickedImageUri, setPickedImageUri] = useState(null);
  const [formMarginTop, setFormMarginTop] = useState(
    Dimensions.get('window').height * 0.2,
  );
  const {mealId} = route.params;

  const editedMeal = useSelector(state =>
    state.meals.userMeals.find(meal => meal.id === mealId),
  );

  const userMeals = useSelector(state => state.meals.userMeals);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      <CustomDialogBox title={Strings.ERROR_OCCURED} message={error} />;
    }
  }, [error]);

  if (isLoading) {
    <ActivityIndicatorView />;
  }

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
    validationSchema: editMealFormValidation,
    initialValues: {
      title: editedMeal ? editedMeal.title : '',
      steps: editedMeal ? editedMeal.steps : '',
      imageUrl: editedMeal ? editedMeal.imageUrl : null,
    },
    onSubmit: (values, {resetForm}) => {
      submitFormData();
      resetForm();
    },
  });

  const pickImage = () => {
    launchImageLibrary({selectionLimit: 1, mediaType: 'photo'}, response => {
      if (response.didCancel) {
      }
      if (response.assets) {
        let source = response.assets[0].uri;
        setPickedImageUri(source);
        values.imageUrl = source;
      }
    });
  };

  const submitFormData = () => {
    setIsLoading(true);
    let newUserMealsData = userMeals;
    if (editedMeal) {
      for (let meal of newUserMealsData) {
        if (meal.id === editedMeal.id) {
          meal.title = values.title;
          meal.steps = values.steps;
          meal.imageUrl = values.imageUrl;
        }
      }
    } else {
      let id = '_' + Math.random().toString(36).substr(2, 9);
      values.id = id;
      newUserMealsData = [...newUserMealsData, values];
    }
    let userMealReq = {userMeals: newUserMealsData};
    setError(null);
    try {
      dispatch(mealActions.saveUserMeals(userMealReq));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    Alert.alert(Strings.MEAL_SUCCESSFULLY_ADDED, '',[
      {
        text: Strings.OK,
        onPress: () => {
          if (editedMeal) {
            navigation.goBack();
          }
        },
      },
    ]);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: Strings.ADD_MEAL,
    });
  });
  return (
    <SafeAreaView style={AppStyle.screenContainer}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps={'handled'}
        enableResetScrollToCoords={false}
        keyboardDismissMode="on-drag">
        <View style={{...styles.forms, marginTop: formMarginTop}}>
          <TextInput
            name="title"
            style={{
              ...styles.formTextInput,
              ...Platform.select({
                ios: {
                  height: '20%',
                },
              }),
            }}
            placeholder={Strings.ENTER_MEAL_TITLE}
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
          />
          {errors.title && touched.title && (
            <Text style={AppStyle.errorText}>{errors.title}</Text>
          )}
          <TextInput
            name="steps"
            placeholder={Strings.ENTER_MEAL_PRICE}
            style={{
              ...styles.formTextInput,
              ...Platform.select({
                ios: {
                  height: '50%',
                },
                android: {
                  height: '30%',
                },
              }),
            }}
            multiline={true}
            numberOfLines={10}
            returnKeyType="next"
            onChangeText={handleChange('steps')}
            onBlur={handleBlur('steps')}
            value={values.steps}
          />
          {errors.steps && touched.steps && (
            <Text style={AppStyle.errorText}>{errors.steps}</Text>
          )}

          <TouchableOpacity style={styles.inputImage} onPress={pickImage}>
            <Text>{Strings.CHOOSE_MEAL_IMAGE}</Text>
          </TouchableOpacity>
          <View>
            <Button
              title={Strings.SAVE_MEAL_BUTTON}
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditMealsScreen;
