import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useAppStyle} from '../styles/AppStyle';
const ActivityIndicatorView = () => {
  return (
    <View style={useAppStyle().styles.activityIndicator}>
      <ActivityIndicator
        size="large"
        color={useAppStyle().theme.primaryTextColor}
      />
    </View>
  );
};

export default ActivityIndicatorView;
