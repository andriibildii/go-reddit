import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchPostsHot,
    fetchPostsNew,
    fetchPostsTop,
    fetchSubredditAbout,
    fetchSearchResults,
    fetchPostComments,
} from '../api/go-reddit-api';

export const loadPostsHot = createAsyncThunk(
    'post/loadSubredditPostsHot',
    async subreddit => {
        return await fetchPostsHot(subreddit);
    },
);

export const loadPostsNew = createAsyncThunk(
    'post/loadSubredditPostsNew',
    async subreddit => {
        return await fetchPostsNew(subreddit);
    },
);

export const loadPostsTop = createAsyncThunk(
    'post/loadSubredditPostsTop',
    async subreddit => {
        return await fetchPostsTop(subreddit);
    },
);

export const loadSubredditAbout = createAsyncThunk(
    'post/loadSubredditAbout',
    async subreddit => {
        return await fetchSubredditAbout(subreddit);
    },
);

export const loadSearchResults = createAsyncThunk(
    'post/loadSearchResults',
    async searchTerm => {
        return await fetchSearchResults(searchTerm);
    },
);

export const loadComments = createAsyncThunk(
    'post/loadComments',
    async ({ index, permalink }) => {
        const comments = await fetchPostComments(permalink);
        return { index: index, comments: comments };
    },
);

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        about: [],
        currentFilter: 'hot',
        isLoading: false,
        error: false,
        hasSearched: false,
    },
    reducers: {
        setShowingComments: (state, action) => {
            state.posts[action.payload.index].showingComments =
                action.payload.showingComments;
        },
        setCommentsNum: (state, action) => {
            state.posts[action.payload.index].commentsNum =
                action.payload.commentsNum;
        },
        setIsLoadingComments: (state, action) => {
            state.posts[action.payload.index].isLoadingComments =
                action.payload.isLoadingComments;
        },
    },

    extraReducers: builder => {
        builder
            // LOAD HOT POSTS
            .addCase(loadPostsHot.pending, state => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(loadPostsHot.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.posts.map(post => {
                    post.showingComments = false;
                    post.comments = [];
                    post.commentsNum = 3;
                    post.isLoadingComments = false;
                    return post;
                });
                state.isLoading = false;
            })
            .addCase(loadPostsHot.rejected, state => {
                state.isLoading = false;
                state.error = true;
            })

            // LOAD NEW POSTS
            .addCase(loadPostsNew.pending, state => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(loadPostsNew.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.posts.map(post => {
                    post.showingComments = false;
                    post.comments = [];
                    post.commentsNum = 3;
                    post.isLoadingComments = false;
                    return post;
                });
                state.isLoading = false;
            })

            .addCase(loadPostsNew.rejected, state => {
                state.isLoading = false;
                state.error = true;
            })

            // LOAD TOP POSTS
            .addCase(loadPostsTop.pending, state => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(loadPostsTop.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.posts.map(post => {
                    post.showingComments = false;
                    post.comments = [];
                    post.commentsNum = 3;
                    post.isLoadingComments = false;
                    return post;
                });
                state.isLoading = false;
            })

            .addCase(loadPostsTop.rejected, state => {
                state.isLoading = false;
                state.error = true;
            })

            // LOAD SUBREDDIT ABOUT
            .addCase(loadSubredditAbout.pending, state => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(loadSubredditAbout.fulfilled, (state, action) => {
                state.about = action.payload;
                state.isLoading = false;
            })

            .addCase(loadSubredditAbout.rejected, state => {
                state.isLoading = false;
                state.error = true;
            })

            // LOAD SEARCH RESULTS
            .addCase(loadSearchResults.pending, state => {
                state.isLoading = true;
                state.error = false;
                state.hasSearched = true;
            })
            .addCase(loadSearchResults.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.posts.map(post => {
                    post.showingComments = false;
                    post.comments = [];
                    post.commentsNum = 3;
                    return post;
                });
                state.isLoading = false;
                state.hasSearched = true;
            })
            .addCase(loadSearchResults.rejected, state => {
                state.isLoading = false;
                state.error = true;
            })

            // LOAD COMMENTS
            .addCase(loadComments.pending, (state, action) => {
                state.posts[action.meta.arg.index].comments = [];
                state.posts[action.meta.arg.index].isLoadingComments = true;
            })
            .addCase(loadComments.fulfilled, (state, action) => {
                state.posts[action.payload.index].comments =
                    action.payload.comments;
                state.posts[action.meta.arg.index].isLoadingComments = false;
            })
            .addCase(loadComments.rejected, (state, action) => {
                state.posts[action.meta.arg.index].isLoadingComments = false;
            });
    },
});

//
export const selectAbout = state => state.post.about;
export const selectPostFeed = state => state.post;
export const { setShowingComments, setCommentsNum, setIsLoadingComments } =
    postSlice.actions;
export default postSlice.reducer;
