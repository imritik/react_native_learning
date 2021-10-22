import React from 'react';
import {Text, View} from 'react-native';
import styles from '../styles/AppStyle';

const EmptyList = props => {
  return (
    <View style={styles.emptyListContainer}>
      <Text>{props.message}</Text>
    </View>
  );
};

export default EmptyList;
