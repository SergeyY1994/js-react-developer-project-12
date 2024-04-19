import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
      const response = await axios.get('/api/v1/channels', {headers: {Authorization: `Bearer ${token}`}});
      return response.data;
  },
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (name) => {
    const newChannel = { name };
    const response = await axios.post('/api/v1/channels', newChannel, {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
  }
)

const chatAdapter = createEntityAdapter();
const initialState = chatAdapter.getInitialState();

const chatSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
      // Любые редьюсеры, которые нам нужны
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchChannels.fulfilled, chatAdapter.addMany)
        .addCase(addChannel.fulfilled, chatAdapter.addOne)
    },
  })

  export const selectAllChannels = chatAdapter.getSelectors((state) => state.channels);
  export default chatSlice.reducer;

