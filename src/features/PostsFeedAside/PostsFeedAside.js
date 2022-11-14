import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import About from '../About/About';
import Filters from '../Filters/Filters';
import Post from '../Post/Post';
import Loading from '../../components/Loading/Loading';
import Card from '../../components/Card/Card';
import {
    loadPostsHot,
    loadSubredditAbout,
    selectPostFeed,
} from '../../app/postSlice';
import { setCurrentSubreddit } from '../SubredditsAside/subredditsAsideSlice';
import { setCurrentFilter } from '../Filters/filtersSlice';

const PostsFeedAside = () => {
    const { id: currentSubreddit } = useParams();
    const dispatch = useDispatch();
    const postsFeed = useSelector(selectPostFeed);
    const { posts, isLoading } = postsFeed;
    const prefixedSubreddit = 'r/' + currentSubreddit;

    useEffect(() => {
        dispatch(loadPostsHot(prefixedSubreddit));
        dispatch(setCurrentSubreddit(prefixedSubreddit));
        dispatch(setCurrentFilter('hot'));
        dispatch(loadSubredditAbout(prefixedSubreddit));
    }, [dispatch, prefixedSubreddit]);

    if (isLoading) {
        return <Loading />;
    }

    if (!isLoading && posts.length === 0) {
        let returnPhrase = 'Error, could not load any posts.';
        return (
            <Card className="search-heading">
                <h2>{returnPhrase}</h2>
            </Card>
        );
    }

    return (
        <>
            <About />
            <Filters type="subreddit" />
            {posts.map((post, index) => (
                <Post key={index} post={post} index={index} />
            ))}
        </>
    );
};

export default PostsFeedAside;
