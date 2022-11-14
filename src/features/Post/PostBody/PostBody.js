import React from 'react';
import './PostBody.css';

const PostBody = ({ post }) => {
    const postTitle = post.data.title;
    return (
        <>
            <div className="post-text">
                <h3>{postTitle}</h3>
            </div>
            {post.data.post_hint === 'image' && (
                <div className="post-image">
                    <img
                        src={post.data.url_overridden_by_dest}
                        alt="media"
                    ></img>
                </div>
            )}
        </>
    );
};

export default PostBody;
