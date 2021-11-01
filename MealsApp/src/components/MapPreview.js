import React from 'react';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import ENV from '../../env';
import styles from '../styles/MapPreviewStyles';

const MapPreview = props => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
  }
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{...styles.mapPreview, ...props.style}}>
      {props.location ? (
        <Image style={styles.mapImage} source={{uri: imagePreviewUrl}} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

export default MapPreview;
