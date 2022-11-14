import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Comment.css';
import { timeAgo } from '../../utils/getPostTime';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { fetchUserAvatar } from '../../api/go-reddit-api';

const Comment = ({ comment }) => {
    const [userIcon, setUserIcon] = useState('');

    useEffect(() => {
        try {
            fetchUserAvatar(comment.author).then(response => {
                if (response !== undefined) {
                    setUserIcon(response.snoovatar_img);
                }
            });
        } catch (error) {
            console.log(error);
        }

        return () => setUserIcon('');
    }, [comment]);

    const createAvatar = url => {
        if (url) {
            return <img src={url} alt="avatar" className="comment-avatar" />;
        } else {
            return <IoPersonCircleOutline className="comment-avatar" />;
        }
    };

    return (
        <div className="comment">
            <div className="avatar-container">{createAvatar(userIcon)}</div>
            <div className="comment-contents">
                <div className="comment-details">
                    <span className="username comment-author">
                        {comment.author || 'username'}
                    </span>
                    <span className="date">{timeAgo(comment.created_utc)}</span>
                </div>
                <div className="comment-text">
                    <ReactMarkdown children={comment.body} />
                </div>
            </div>
        </div>
    );
};

export default Comment;
