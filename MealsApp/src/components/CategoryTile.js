import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';

import styles from '../styles/CategortGridTileStyle';

const CategoryGridTile = props => {
  let TouchableComp = TouchableOpacity;
  if (Platform.OS == 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableComp style={styles.touchableComp} onPress={props.onSelect}>
        <View style={{...styles.container, ...{backgroundColor: props.color}}}>
          <Text style={styles.gridTileTitle} numberOfLines={2}>
            {props.gridTileTitle}
          </Text>
        </View>
      </TouchableComp>
    </View>
  );
};

export default CategoryGridTile;
