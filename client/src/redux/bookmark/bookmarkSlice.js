import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch the bookmarks from the API
export const fetchBookmarks = createAsyncThunk(
  'bookmarks/fetchBookmarks',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/user/${userId}/bookmarks`);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue('Failed to fetch bookmarks');
      }

      return data.bookmarks; // Return the bookmarks array
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to delete a bookmark from the API
export const deleteBookmark = createAsyncThunk(
  'bookmarks/deleteBookmark',
  async ({ userId, postId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`/api/user/${userId}/bookmark/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        return rejectWithValue('Failed to delete bookmark');
      }

      // After successfully deleting the bookmark, re-fetch the updated bookmarks
      dispatch(fetchBookmarks(userId));
      return postId; // Return the deleted bookmark's postId
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    items: [],
    totalBookmarks: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.totalBookmarks = action.payload.length;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.items = state.items.filter((bookmark) => bookmark._id !== action.payload);
        state.totalBookmarks = state.items.length;
      });
  },
});

export default bookmarkSlice.reducer;