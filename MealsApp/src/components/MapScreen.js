import LocationView from 'react-native-location-view';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useAppStyle} from '../styles/AppStyle';
import ENV from '../../env';

const MapScreen = props => {
  return (
    <SafeAreaView style={useAppStyle().styles.screenContainer}>
      <LocationView
        apiKey={ENV.googleApiKey}
        initialLocation={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
        // onLocationSelect={()=>{}}
        markerColor="dodgerblue"
      />
    </SafeAreaView>
  );
};
export default MapScreen;
