import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Post from '../Post/Post';
import Loading from '../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { loadSearchResults, selectPostFeed } from '../../app/postSlice';
import { setCurrentSubreddit } from '../SubredditsAside/subredditsAsideSlice';
import { setCurrentFilter } from '../Filters/filtersSlice';
import './PostsFeedSearch.css';

const PostsFeedSearch = () => {
    const { id: currentSubreddit } = useParams();
    const dispatch = useDispatch();
    const postsFeed = useSelector(selectPostFeed);
    const { posts, isLoading, hasSearched } = postsFeed;

    useEffect(() => {
        dispatch(setCurrentSubreddit('searchresults'));
        dispatch(setCurrentFilter('hot'));
        dispatch(loadSearchResults(currentSubreddit));
    }, [dispatch, currentSubreddit]);

    if (isLoading) {
        return <Loading />;
    }

    if (!isLoading && posts.length === 0) {
        let returnPhrase = hasSearched
            ? `Sorry, could not find any posts for ${currentSubreddit}.`
            : 'Error, could not load any posts.';

        return (
            <Card className="search-heading">
                <h2>{returnPhrase}</h2>
            </Card>
        );
    }

    return (
        <>
            <Card className="search-heading">
                <h2>Search results for &quot;{currentSubreddit}&quot;</h2>
            </Card>
            {posts.map((post, index) => (
                <Post key={index} post={post} index={index} />
            ))}
        </>
    );
};

export default PostsFeedSearch;
