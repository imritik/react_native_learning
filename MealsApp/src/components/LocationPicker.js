import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-elements';
import {SafeAreaView, Text} from 'react-native';
import {View} from 'react-native';
import {Alert} from 'react-native';
import * as permissions from 'react-native-permissions';
import Strings from '../helpers/Strings';
import {useAppStyle} from '../styles/AppStyle';
import ActivityIndicatorView from './ActivityIndicatorView';
import MapPreview from './MapPreview';
import styles from '../styles/LocationPickerStyle';
const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  //   const mapPickedLocation = props.navigation.getParam('pickedLocation');
  const mapPickedLocation = props.pickedLocation;

  const {onLocationPicked} = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  //   const verifyPermissions = async () => {
  //     const result = await permissions.PERMISSIONS.request('location');
  //     Alert.alert(JSON.stringify(result));
  //   };

  const getLocationHandler = async () => {
    // const hasPermission = await verifyPermissions();
    // if (!hasPermission) {
    //   return;
    // }

    try {
      setIsFetching(true);
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  };

  return (
    <SafeAreaView style={useAppStyle().styles.screenContainer}>
      <View>
        <MapPreview
          style={useAppStyle().styles.mapPreview}
          location={pickedLocation}
          onPress={pickOnMapHandler}>
          {isFetching ? (
            <ActivityIndicatorView />
          ) : (
            <Text style={useAppStyle().styles.textInputColor}>
              {Strings.NO_LOCATION_CHOSEN}
            </Text>
          )}
        </MapPreview>
        <View style={styles.actions}>
          <Button
            title={Strings.GET_USER_LOC}
            titleStyle={{color: useAppStyle().theme.inputBackground}}
            buttonStyle={{backgroundColor: useAppStyle().theme.accentColor}}
            onPress={getLocationHandler}
          />
          <Button title={Strings.PICK_ON_MAP} onPress={pickOnMapHandler} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocationPicker;
