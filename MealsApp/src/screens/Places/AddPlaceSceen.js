import React, {useCallback, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import Strings from '../../helpers/Strings';
import {useAppStyle} from '../../styles/AppStyle';
import * as placesAction from '../../store/actions/places';
import styles from '../../styles/AddPlaceStyle';
import {Platform} from 'react-native';
import LocationPicker from '../../components/LocationPicker';
import ImgPicker from '../../components/ImagePickerComp';
const AddPlaceScreen = ({props, route, navigation}) => {
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  let pickedLocation;
  if (route.params) {
    pickedLocation = route.params.pickedLocation;
  }
  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitle(text);
  };

  const savePlaceHandler = () => {
    //   dispatch(placesAction.addPlace(title,));
    navigation.goBack();
  };

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  };

  const locationPickedHandler = useCallback(location => {
    setSelectedLocation(location);
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: Strings.ADD_PLACE,
    });
  });

  return (
    <SafeAreaView style={useAppStyle().styles.screenContainer}>
      <ScrollView>
        <View style={styles.forms}>
          <TextInput
            style={{
              ...styles.formTextInput,
              ...Platform.select({
                ios: {
                  height: '10%',
                },
              }),
            }}
            placeholder={Strings.ENTER_PLACE_TITLE}
            placeholderTextColor={useAppStyle().theme.placeholderTextColor}
            value={title}
            onChangeText={titleChangeHandler}
          />
          <ImgPicker onImageTaken={imageTakenHandler} />
          <LocationPicker
            navigation={navigation}
            pickedLocation={pickedLocation}
            onLocationPicked={locationPickedHandler}
          />
          <Button
            title={Strings.SAVE}
            onPress={savePlaceHandler}
            disabled={title.length ? false : true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPlaceScreen;
