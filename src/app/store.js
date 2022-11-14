import { configureStore } from '@reduxjs/toolkit';
import subredditsAsideReducer from '../features/SubredditsAside/subredditsAsideSlice';
import postReducer from './postSlice';
import filtersReducer from '../features/Filters/filtersSlice';
import searchReducer from '../features/Search/searchSlice';

export const store = configureStore({
    reducer: {
        subredditsAside: subredditsAsideReducer,
        post: postReducer,
        filters: filtersReducer,
        search: searchReducer,
    },
});
