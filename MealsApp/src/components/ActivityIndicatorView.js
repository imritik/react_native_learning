import React from 'react';
import {View, ActivityIndicator} from 'react-native';
const ActivityIndicatorView = () => {
  return (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
  );
};

export default ActivityIndicatorView;
