import React, {useEffect, useState} from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  TextInput,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import APPLICATION_CONSTANTS from '../helpers/strings';
import styles from '../styles/goalInput.style';
import AppStyles from '../styles/app.style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomButton from './CustomButton';
import COLORS from '../helpers/colors';

const GoalInput = props => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [paddingTopModal, setPaddingTopModal] = useState(
    Dimensions.get('window').height * 0.2,
  );

  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal('');
  };

  useEffect(() => {
    const updateLayout = () => {
      if (Dimensions.get('window').height < 500) {
        setPaddingTopModal(Dimensions.get('window').height * 0.1);
      } else {
        setPaddingTopModal(Dimensions.get('window').height * 0.2);
      }
    };

    dimensionsSub =Dimensions.addEventListener('change', updateLayout);

    return () => {
      dimensionsSub?.remove();
    };
  });

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      visible={props.visible}
      animationType="slide">
      <ScrollView keyboardDismissMode="on-drag">
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
          <View style={{...styles.inputContainer, paddingTop: paddingTopModal}}>
            <View style={AppStyles.imageContainer}>
              <Image
                style={AppStyles.image}
                source={require('../assets/images/goal2.jpeg')}
                resizeMode="cover"
              />
            </View>
            <TextInput
              placeholder={APPLICATION_CONSTANTS.Course_Goal_Placeholder}
              style={styles.input}
              onChangeText={goalInputHandler}
              value={enteredGoal}
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                onPress={props.onCancel}
                buttonTextStyle={styles.buttonText}
                buttonContainerStyle={{
                  ...styles.button,
                  backgroundColor: COLORS.CANCEL_BUTTON_COLOR,
                }}>
                <Icon name="times" size={14} color="white" />{' '}
                {APPLICATION_CONSTANTS.CANCEL}
              </CustomButton>
              <CustomButton
                onPress={addGoalHandler}
                disabled={enteredGoal.length ? false : true}
                buttonTextStyle={styles.buttonText}
                buttonContainerStyle={{
                  ...styles.button,
                  backgroundColor: enteredGoal.length
                    ? COLORS.PRIMARY_COLOR
                    : 'darkgray',
                }}>
                <Icon name="check" size={14} color="white" />{' '}
                {APPLICATION_CONSTANTS.ADD}
              </CustomButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  );
};

export default GoalInput;
