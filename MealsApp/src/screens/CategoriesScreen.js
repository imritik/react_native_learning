import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import CategoryGridTile from '../components/CategoryTile';
import EmptyList from '../components/EmptyList';
import Strings from '../helpers/Strings';
import {useDispatch, useSelector} from 'react-redux';
import * as categoryActions from '../store/actions/categories';
import {IconButton} from 'react-native-paper';
import ActivityIndicatorView from '../components/ActivityIndicatorView';
const CategoriesScreen = ({navigation}) => {
  const renderGridTile = itemData => {
    return (
      <CategoryGridTile
        gridTileTitle={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          navigation.navigate('CategoryMeals', {categoryId: itemData.item.id});
        }}
      />
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: Strings.CATEGORIES_SCREEN_TITLE,
      headerLeft: () => (
        <IconButton
          icon="menu"
          color="white"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      ),
    });
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();

  const loadCategories = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      dispatch(categoryActions.fetchCategories());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadCategories().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadCategories]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('focus', loadCategories);
    return willFocusSub;
  });

  if (error) {
    return <EmptyList message={error} />;
  }

  if (isLoading) {
    <ActivityIndicatorView />;
  }
  return (
    <SafeAreaView>
      <FlatList
        onRefresh={loadCategories}
        refreshing={isRefreshing}
        keyExtractor={(item, index) => item.id}
        data={categories}
        renderItem={renderGridTile}
        numColumns={2}
        ListEmptyComponent={<EmptyList message={Strings.EMPTY_CATEGORY_LIST} />}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;
