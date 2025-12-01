// C:\Users\ADMIN\Desktop\Shani\TaskManager\TaskManager\src\api\taskApi.js
import axios from 'axios';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export const fetchTasks = async (page = 1, limit = 20) => {
  try {
    const start = (page - 1) * limit;
    const response = await axios.get(
      `${API_BASE}/todos?_start=${start}&_limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};