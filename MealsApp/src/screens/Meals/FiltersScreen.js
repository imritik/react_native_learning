import React, {useState, useEffect, useCallback} from 'react';
import {Switch, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Strings from '../../helpers/Strings';
import {setFilters} from '../../store/actions/meals';
import styles from '../../styles/FilterScreenStyle';
import {IconButton} from 'react-native-paper';
import {useAppStyle} from '../../styles/AppStyle';
const FilterSwitchButton = props => {
  return (
    <View style={styles.filterButtonContainer}>
      <Text style={useAppStyle().styles.textInputColor}>{props.label}</Text>
      <Switch value={props.state} onValueChange={props.onChange} />
    </View>
  );
};
const FiltersScreen = ({route, navigation}) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="menu"
          color="white"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      ),
      headerRight: () => (
        <IconButton icon="check" color="white" onPress={saveFilters} />
      ),
    });
  });

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isVegan, isLactoseFree, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({saveCurrentFilters: saveFilters});
  }, [saveFilters]);

  return (
    <View style={styles.filterScreen}>
      <Text
        style={{...styles.title, color: useAppStyle().theme.primaryTextColor}}>
        {Strings.AVAILABLE_FILTERS}
      </Text>
      <FilterSwitchButton
        label={Strings.GLUTEN_FREE}
        state={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)}
      />
      <FilterSwitchButton
        label={Strings.LACTOSE_FREE}
        state={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)}
      />
      <FilterSwitchButton
        label={Strings.VEGAN}
        state={isVegan}
        onChange={newValue => setIsVegan(newValue)}
      />
      <FilterSwitchButton
        label={Strings.VEGETARIAN}
        state={isVegetarian}
        onChange={newValue => setIsVegetarian(newValue)}
      />
    </View>
  );
};
export default FiltersScreen;
