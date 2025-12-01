// C:\Users\ADMIN\Desktop\Shani\TaskManager\TaskManager\src\utils\storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';
const TASKS_KEY = '@local_tasks';

export const saveToken = async token => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  console.log('tokenaaaa---------:', token);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const saveTasks = async tasks => {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getTasks = async () => {
  const tasks = await AsyncStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};