import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAsideSubreddits } from '../../api/go-reddit-api';

export const loadAsideSubreddits = createAsyncThunk(
    'subreddits/loadAsideSubreddits',
    async () => {
        const response = await fetchAsideSubreddits();
        return response;
    },
);

export const subredditsAsideSlice = createSlice({
    name: 'subreddits',
    initialState: {
        beSubreddit: [],
        // isLoading: false,
        currentSubreddit: '/',
        asideError: false,
    },
    reducers: {
        setCurrentSubreddit: (state, action) => {
            state.currentSubreddit = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAsideSubreddits.pending, state => {
                state.asideError = false;
            })
            .addCase(loadAsideSubreddits.fulfilled, (state, action) => {
                state.beSubreddit = action.payload;
            })

            .addCase(loadAsideSubreddits.rejected, state => {
                state.asideError = true;
            });
    },
});

export const selectAsideError = state => state.subredditsAside.asideError;
export const selectCurrentSubreddit = state =>
    state.subredditsAside.currentSubreddit;

export const selectBeSubreddit = state => state.subredditsAside.beSubreddit;

export const { setCurrentSubreddit } = subredditsAsideSlice.actions;
export default subredditsAsideSlice.reducer;
