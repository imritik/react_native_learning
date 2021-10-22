import React from 'react';
import {
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import Colors from '../helpers/Colors';
import styles from '../styles/MealItemStyle';
const MealItem = props => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.isUserMeals ? () => {} : props.onSelect}>
        <View>
          <View style={{...styles.mealRow, ...styles.mealHeader}}>
            <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          {!props.isUserMeals && (
            <View style={{...styles.mealRow, ...styles.mealDetail}}>
              <Text>{props.duration}m</Text>
              <Text>{props.complexity.toUpperCase()}</Text>
              <Text>{props.affordability.toUpperCase()}</Text>
            </View>
          )}
          {props.isUserMeals && (
            <View
              style={{
                ...styles.mealRow,
                ...styles.mealDetail,
                backgroundColor: Colors.accentColor,
              }}>
              <Button title="Edit" onPress={props.onEditClick} />
              <Button title="Delete" onPress={props.onDelete} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MealItem;
