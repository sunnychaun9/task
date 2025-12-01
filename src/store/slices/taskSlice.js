// C:\Users\ADMIN\Desktop\Shani\TaskManager\TaskManager\src\store\slices\taskSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchTasks} from '../../api/taskApi';
import {saveTasks, getTasks} from '../../utils/storage';

export const loadTasks = createAsyncThunk(
  'tasks/loadTasks',
  async ({page = 1, refresh = false}) => {
    const apiTasks = await fetchTasks(page);
    const localTasks = await getTasks();
    console.log('localTasks---------:', localTasks);
    return {
      apiTasks,
      localTasks,
      page,
      refresh,
    };
  },
);

export const addTask = createAsyncThunk('tasks/addTask', async taskData => {
  const localTasks = await getTasks();
  const newTask = {
    id: `local_${Date.now()}`,
    ...taskData,
    completed: false,
    createdAt: new Date().toISOString(),
    isLocal: true,
  };
  console.log('newTask---------:', newTask);
  const updatedTasks = [newTask, ...localTasks];
  await saveTasks(updatedTasks);
  
  return newTask;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async task => {
  const localTasks = await getTasks();
  const index = localTasks.findIndex(t => t.id === task.id);
  
  if (index !== -1) {
    localTasks[index] = {...localTasks[index], ...task};
    await saveTasks(localTasks);
  }
  
  return task;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    refreshing: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadTasks.pending, (state, action) => {
        if (action.meta.arg.refresh) {
          state.refreshing = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        const {apiTasks, localTasks, page, refresh} = action.payload;
        
        if (refresh) {
          state.items = [...localTasks, ...apiTasks];
          state.page = 1;
        } else {
          const combined = page === 1 ? [...localTasks, ...apiTasks] : apiTasks;
          state.items = page === 1 ? combined : [...state.items, ...combined];
          state.page = page;
        }
        
        state.hasMore = apiTasks.length > 0;
        state.loading = false;
        state.refreshing = false;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = {...state.items[index], ...action.payload};
        }
      });
  },
});

export default taskSlice.reducer;