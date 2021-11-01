import {PermissionsAndroid} from 'react-native';
import TouchID from 'react-native-touch-id';

export const checkCameraPermission = async () => {
  const result = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );
  if (!result) {
    const hasPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (hasPermission == 'denied' || 'never_ask_again') {
      return false;
    }
    return true;
  }
  return true;
};

export const touchIdAuth = async () => {
  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    color: 'ffffff', // Android,
    fallbackLabel: 'Show Passcode',
    passcodeFallback: true, // iOS (if empty, then label is hidden)
  };

  return new Promise((resolve, reject) => {
    TouchID.isSupported()
      .then(biometryType => {
        if (biometryType != null || biometryType != undefined) {
          TouchID.authenticate('Authenticate', optionalConfigObject)
            .then(success => {
              resolve(success);
            })
            .catch(error => {
              reject(error);
            });
        } else {
          reject();
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
