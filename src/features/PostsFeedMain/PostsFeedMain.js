import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Post from '../Post/Post';
import Filters from '../Filters/Filters';
import Loading from '../../components/Loading/Loading';
import { loadPostsHot, selectPostFeed } from '../../app/postSlice';
import { setCurrentSubreddit } from '../SubredditsAside/subredditsAsideSlice';
import { setCurrentFilter } from '../Filters/filtersSlice';

const PostsFeedMain = () => {
    const { id: currentSubreddit } = useParams();
    const dispatch = useDispatch();

    const postsFeed = useSelector(selectPostFeed);
    const { posts, isLoading } = postsFeed;

    useEffect(() => {
        dispatch(loadPostsHot());
        dispatch(setCurrentSubreddit(''));
        dispatch(setCurrentFilter('hot'));
    }, [dispatch, currentSubreddit]);

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
            <Filters />
            {posts.map((post, index) => (
                <Post key={index} post={post} index={index} />
            ))}
        </>
    );
};

export default PostsFeedMain;
