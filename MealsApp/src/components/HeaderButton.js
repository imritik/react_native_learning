import React from 'react';
import {Icon} from 'react-native-vector-icons/FontAwesome5';
import {HeaderButton} from 'react-navigation-header-buttons';
import Colors from '../helpers/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Icon}
      color={Colors.appBarTitleColor}
    />
  );
};

export default CustomHeaderButton;
