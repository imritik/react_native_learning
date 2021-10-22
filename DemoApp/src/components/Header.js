import React from 'react';
import styles from '../styles/app.style';
import {Appbar} from 'react-native-paper';
import {StatusBar} from 'react-native';
import {View} from 'react-native';
import COLORS from '../helpers/colors';
const AppBar = props => (
  <View>
    <StatusBar
      barStyle="light-content"
      hidden={false}
      backgroundColor={COLORS.PRIMARY_COLOR}
    />
    <Appbar.Header style={styles.appBar}>
      <Appbar.Content title={props.title} style={styles.appBarTitle} />
    </Appbar.Header>
  </View>
);

export default AppBar;
