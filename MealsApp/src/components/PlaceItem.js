import React from 'react';
import {Text} from 'react-native';
import {Image} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import styles from '../styles/PlaceItemStyle';
const PlaceItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{uri: props.image}} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItem;
