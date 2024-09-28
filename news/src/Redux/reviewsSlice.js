// src/redux/reviewsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReviewsNews = createAsyncThunk('reviews/fetchReviewsNews', async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/api/reviews');
  return response.data;
});

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviewsNews: [],
    latestNews: [],
    mostPopular: [],
    nowPlaying: [],
    fromTheBlog: [],
    reviewCollections: [],
    loading: true,
    error: null,
    selectedFilter: 'All'
  },
  reducers: {
    setSelectedFilter(state, action) {
      state.selectedFilter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsNews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewsNews = action.payload;
        state.latestNews = action.payload.slice(0, 3);
        state.mostPopular = action.payload.filter(news => news.popularity > 8).slice(0, 4);
        state.nowPlaying = action.payload.filter(news => news.now_playing);
        state.fromTheBlog = action.payload.filter(news => news.from_the_blog);
        state.reviewCollections = action.payload.filter(news => news.review_collections);
      })
      .addCase(fetchReviewsNews.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to fetch reviews news';
      });
  }
});

export const { setSelectedFilter } = reviewsSlice.actions;
export default reviewsSlice.reducer;
