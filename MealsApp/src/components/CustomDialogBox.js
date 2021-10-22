import React from 'react';
import {Alert} from 'react-native';
import Strings from '../helpers/Strings';

const CustomDialogBox = ({
  title,
  message,
  showCancelButton = false,
  onOkClick,
}) => {
  return Alert.alert(title, message, [
    showCancelButton
      ? {
          text: Strings.CANCEL,
          onPress: () => {},
        }
      : {},
    {text: Strings.OK, onPress: {onOkClick}},
  ]);
};

export default CustomDialogBox;
