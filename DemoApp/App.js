import React, {useState, useEffect} from 'react';
import {
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import styles from './src/styles/app.style';
import APPLICATION_CONSTANTS from './src/helpers/strings';
import GoalInput from './src/components/GoalInputModal';
import GoalItem from './src/components/GoalItem';
import EmptyListMessage from './src/components/EmptyList';
import {SearchBar} from 'react-native-elements';
import AppBar from './src/components/Header';
import CustomButton from './src/components/CustomButton';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [searchBarText, setSearchBarText] = useState('');
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [marginTopImage, setMarginTopImage] = useState(
    Dimensions.get('window').height * 0.1,
  );
  const addGoalHandler = goalTitle => {
    let newGoalItemSet = [
      ...courseGoals,
      {id: Math.random().toString(), value: goalTitle},
    ];
    setCourseGoals(newGoalItemSet);
    setFilteredGoals(newGoalItemSet);
    setIsAddMode(false);
  };

  const deleteGoalHandler = goalId => {
    let updatedGoalItems = courseGoals.filter(goal => goal.id !== goalId);
    setCourseGoals(updatedGoalItems);
    setFilteredGoals(updatedGoalItems);
  };

  const cancelAddGoalHandler = () => {
    setIsAddMode(false);
  };

  const filterList = searchText => {
    setSearchBarText(searchText);
    if (!courseGoals.length) {
      return;
    }
    setFilteredGoals(currentGoals => {
      return searchText != ''
        ? courseGoals.filter(goal =>
            goal.value.toLowerCase().includes(searchText.toLowerCase()),
          )
        : courseGoals;
    });
  };

  useEffect(() => {
    const updateLayout = () => {
      setMarginTopImage(Dimensions.get('window').height * 0.1);
    };
    dimensionsSub = Dimensions.addEventListener('change', updateLayout);
    return () => {
      dimensionsSub?.remove();
    };
  });

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.outerContainer}>
            <AppBar title={APPLICATION_CONSTANTS.HOME_PAGE_TITLE} />
            <View style={styles.screen}>
              <SearchBar
                inputStyle={{backgroundColor: 'white'}}
                inputContainerStyle={{backgroundColor: 'white'}}
                containerStyle={{
                  backgroundColor: 'aliceblue',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                placeholder={APPLICATION_CONSTANTS.SEARCHBAR_PLACEHOLDER}
                autoCapitalize="none"
                onChangeText={filterList}
                value={searchBarText}
              />
              <CustomButton onPress={() => setIsAddMode(true)}>
                {APPLICATION_CONSTANTS.ADD_NEW_GOAL}
              </CustomButton>
              <FlatList
                keyExtractor={(item, index) => item.id}
                data={filteredGoals}
                renderItem={itemGoal => (
                  <GoalItem
                    id={itemGoal.item.id}
                    onDelete={deleteGoalHandler}
                    title={itemGoal.item.value}
                  />
                )}
                ListEmptyComponent={
                  <EmptyListMessage
                    style={{
                      ...styles.emptyListMessage,
                      paddingTop: marginTopImage,
                    }}
                    message={APPLICATION_CONSTANTS.EMPTY_LIST}
                  />
                }
              />
              <GoalInput
                visible={isAddMode}
                onAddGoal={addGoalHandler}
                onCancel={cancelAddGoalHandler}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
