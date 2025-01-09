import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailsScreen from './src/screens/TaskDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TaskList">
                <Stack.Screen name="TaskList" component={TaskListScreen} />
                <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;