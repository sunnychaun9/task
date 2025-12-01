// C:\Users\ADMIN\Desktop\Shani\TaskManager\TaskManager\src\store\slices\authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {saveToken, getToken, removeToken} from '../../utils/storage';

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const token = await getToken();
  return token;
});

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password.length >= 6) {
      console.log('login credentials---------:', {email, password});
      const token = `token_${Date.now()}`;
      await saveToken(token);
      return {email, token};
    }
    throw new Error('Invalid credentials');
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await removeToken();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.token = action.payload;
        }
      })
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {email: action.payload.email};
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;