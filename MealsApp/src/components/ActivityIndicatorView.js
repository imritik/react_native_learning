import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import AppStyle from '../styles/AppStyle';
import Colors
 from '../helpers/Colors';
const ActivityIndicatorView = () => {
  return (
    <View style={AppStyle.activityIndicator}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
  );
};

export default ActivityIndicatorView;
