import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from '../styles/goalItem.style';

const GoalItem = props => {
  return (
    <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoalItem;
