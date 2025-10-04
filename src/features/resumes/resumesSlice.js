import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchResumes = createAsyncThunk('resumes/fetchResumes', async () => {
  const res = await api.get('/resumes');
  return res.data;
});

export const createResume = createAsyncThunk('resumes/createResume', async (resume) => {
  const res = await api.post('/resumes', resume);
  return res.data;
});

export const updateResume = createAsyncThunk('resumes/updateResume', async ({ id, resume }) => {
  const res = await api.put(`/resumes/${id}`, resume);
  return res.data;
});

export const deleteResume = createAsyncThunk('resumes/deleteResume', async (id) => {
  await api.delete(`/resumes/${id}`);
  return id;
});

const resumesSlice = createSlice({
  name: 'resumes',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchResumes.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; })
      .addCase(fetchResumes.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; })
      .addCase(createResume.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateResume.fulfilled, (state, action) => {
        const idx = state.items.findIndex(r => r._id === action.payload._id);
        if (idx >= 0) state.items[idx] = action.payload;
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.items = state.items.filter(r => r._id !== action.payload);
      });
  }
});

export default resumesSlice.reducer;
