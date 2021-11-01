import React from 'react';
import {Text, View} from 'react-native';
import {useAppStyle} from '../styles/AppStyle';

const EmptyList = props => {
  return (
    <View style={useAppStyle().styles.emptyListContainer}>
      <Text style={useAppStyle().styles.textInputColor}>
        {props.message}
      </Text>
    </View>
  );
};

export default EmptyList;
