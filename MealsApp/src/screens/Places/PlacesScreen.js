import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {FlatList} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import EmptyList from '../../components/EmptyList';
import PlaceItem from '../../components/PlaceItem';
import Strings from '../../helpers/Strings';
import * as placesActions from '../../store/actions/places';
import {useAppStyle} from '../../styles/AppStyle';

const PlacesScreen = ({route, navigation}) => {
  const places = useSelector(state => state.places.places);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: Strings.PLACES_SCREEN_TTILE,
      headerRight: () => (
        <IconButton
          icon="plus"
          color="white"
          onPress={() => {
            navigation.navigate('AddPlace');
          }}
        />
      ),
    });
  });

  if (places.length === 0 || !places) {
    return <EmptyList message={Strings.EMPTY_PLACES_LIST} />;
  }

  return (
    <SafeAreaView style={useAppStyle().styles.screenContainer}>
      {isLoading ? (
        <ActivityIndicatorView />
      ) : (
        <FlatList
          data={places}
          keyExtractor={item => item.id}
          renderItem={placeItem => (
            <PlaceItem
              image={placeItem.item.imageUri}
              title={placeItem.item.title}
              address={placeItem.item.address}
              onSelect={() => {}}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};
export default PlacesScreen;
