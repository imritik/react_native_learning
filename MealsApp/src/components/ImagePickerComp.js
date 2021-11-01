import React, {useState} from 'react';
import {Image, PermissionsAndroid} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {IconButton} from 'react-native-paper';
import Strings from '../helpers/Strings';
import styles from '../styles/ImagePickerStyle';
import Dialog, {
  SlideAnimation,
  DialogTitle,
  DialogContent,
} from 'react-native-popup-dialog';
import {TouchableOpacity} from 'react-native';
import {Alert} from 'react-native';
import * as utils from '../helpers/Utils/utils';
import {useAppStyle} from '../styles/AppStyle';

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const getImageHandler = () => {
    setIsDialogVisible(true);
  };

  const getImageFromGallery = async () => {
    setIsDialogVisible(false);
    launchImageLibrary({selectionLimit: 1, mediaType: 'photo'}, response => {
      if (response.didCancel) {
      }
      if (response.assets) {
        let source = response.assets[0].uri;
        setPickedImage(source);
        props.onImageTaken(source);
      }
    });
  };

  const openCamera = async () => {
    setIsDialogVisible(false);
    const hasCameraPermission = await utils.checkCameraPermission();
    if (hasCameraPermission) {
      try {
        launchCamera(
          {
            saveToPhotos: true,
            mediaType: 'photo',
          },
          response => {
            if (response.didCancel) {
            }
            if (response.assets) {
              let source = response.assets[0].uri;
              setPickedImage(source);
              props.onImageTaken(source);
            }
          },
        );
      } catch (err) {
        Alert.alert(err.message);
      }
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text style={useAppStyle().styles.textInputColor}>
            {Strings.NO_IMAGE_PICKED}
          </Text>
        ) : (
          <Image style={styles.image} source={{uri: pickedImage}} />
        )}
      </View>
      <IconButton
        icon="camera"
        color={useAppStyle().theme.accentColor}
        onPress={getImageHandler}
      />
      <Dialog
        width="70%"
        visible={isDialogVisible}
        dialogTitle={<DialogTitle title={Strings.SELECT_IMAGE_FROM} />}
        useNativeDriver={true}
        dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
        onTouchOutside={() => setIsDialogVisible(false)}>
        <DialogContent>
          <View>
            <TouchableOpacity style={styles.imgDialogBox} onPress={openCamera}>
              <Text style={{color: 'black'}}>{Strings.CAMERA}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imgDialogBox}
              onPress={getImageFromGallery}>
              <Text style={{color: 'black'}}>{Strings.GALLERY}</Text>
            </TouchableOpacity>
          </View>
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default ImgPicker;
