import React from 'react';
import {Text, View, Image} from 'react-native';
import URLS from '../helpers/urls';
import styles from '../styles/app.style';
const EmptyListMessage = props => {
  return (
    <View style={props.style}>
      <View
        style={{
          ...styles.imageContainer,
          width: 150,
          height: 150,
          borderWidth: 0,
        }}>
        <Image
          style={styles.image}
          source={{
            uri: URLS.NO_GOAL_IMAGE,
          }}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.grayText}>{props.message}</Text>
    </View>
  );
};

export default EmptyListMessage;
