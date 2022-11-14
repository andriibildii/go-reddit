import { useState, useEffect } from 'react';
import { timeAgo } from '../../../utils/getPostTime';
import { fetchSubredditAbout } from '../../../api/go-reddit-api';
import { IoLogoReddit } from 'react-icons/io5';
import './PostHeader.css';

const PostHeader = ({ post }) => {
    const name = post.data.subreddit_name_prefixed;
    const author = post.data.author;
    const time = post.data.created_utc;
    const [subredditIcon, setSubredditIcon] = useState('');

    useEffect(() => {
        fetchSubredditAbout(name).then(res => setSubredditIcon(res.icon_img));
        return () => setSubredditIcon('');
    }, [name]);

    const createSubredditAvatar = url => {
        if (url) {
            return <img src={url} alt="avatar" className="subreddit-avatar" />;
        } else {
            return <IoLogoReddit className="subreddit-avatar" />;
        }
    };

    return (
        <div className="post-details">
            <div className="author-profile">
                {createSubredditAvatar(subredditIcon)}
                <div className="profile-names">
                    <div className="subreddit-name">{name}</div>
                </div>
                <div className="profile-names">
                    <div className="username">posted by {author}</div>
                </div>
            </div>
            <div className="date">{timeAgo(time)}</div>
        </div>
    );
};

export default PostHeader;
