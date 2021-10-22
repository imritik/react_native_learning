import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import styles from '../styles/app.style';

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.6}
      disabled={props.disabled || false}>
      <View style={{...styles.customBtn, ...props.buttonContainerStyle}}>
        <Text style={{...styles.customBtnText, ...props.buttonTextStyle}}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
