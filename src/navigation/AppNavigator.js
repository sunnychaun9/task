// C:\Users\ADMIN\Desktop\Shani\TaskManager\TaskManager\src\navigation\AppNavigator.js
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {checkAuth} from '../store/slices/authSlice';

import LoginScreen from '../screens/LoginScreen';
import TaskListScreen from '../screens/TaskListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="TaskList"
              component={TaskListScreen}
              options={{title: 'Tasks'}}
            />
            <Stack.Screen
              name="AddTask"
              component={AddTaskScreen}
              options={{title: 'Add Task'}}
            />
            <Stack.Screen
              name="TaskDetail"
              component={TaskDetailScreen}
              options={{title: 'Task Details'}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}