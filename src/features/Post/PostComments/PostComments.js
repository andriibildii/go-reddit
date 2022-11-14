import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
    loadComments,
    setShowingComments,
    setCommentsNum,
} from '../../../app/postSlice';
import Comment from '../../Comment/Comment';
import Loading from '../../../components/Loading/Loading';
import { MdOutlineComment } from 'react-icons/md';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BiCommentMinus, BiCommentX, BiCommentAdd } from 'react-icons/bi';
import './PostComments.css';

const PostComments = ({ post, index }) => {
    const dispatch = useDispatch();
    const comments = post.comments.slice(0, post.comments.length);
    const commentsNum = post.commentsNum;

    const handleLoadComments = () => {
        dispatch(setCommentsNum({ index: index, commentsNum: 3 }));
        dispatch(
            setShowingComments({
                index: index,
                showingComments: !post.showingComments,
            }),
        );
        if (!post.showingComments) {
            dispatch(
                loadComments({
                    index: index,
                    permalink: post.data.permalink,
                    showingComments: post.showingComments,
                }),
            );
        }
    };

    const handleShowMore = number => {
        dispatch(setCommentsNum({ index: index, commentsNum: number }));
    };

    const infoComments = () => {
        let text = post.data.num_comments === 1 ? 'comment' : 'comments';
        return (
            <>
                <button
                    className="comments-btn"
                    onClick={() => handleLoadComments()}
                >
                    <MdOutlineComment />
                    {post.data.num_comments} {text}
                    {post.showingComments ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </>
        );
    };

    const commentsButtons = () => {
        if (
            comments.length > 1 &&
            post.showingComments &&
            checkCommentsDisplayed() === false
        ) {
            return (
                <div className="show-container">
                    {commentsNum > 3 && (
                        <button
                            className="show-btn"
                            onClick={() => handleShowMore(commentsNum - 3)}
                        >
                            <BiCommentMinus className="show-bt-icon" /> /show
                            less
                        </button>
                    )}
                    <button
                        className="show-btn"
                        onClick={() => handleLoadComments()}
                    >
                        <BiCommentX className="show-bt-icon" /> /hide
                    </button>
                    <button
                        className="show-btn"
                        onClick={() => handleShowMore(commentsNum + 3)}
                    >
                        <BiCommentAdd className="show-bt-icon" /> /show more
                    </button>
                </div>
            );
        }
    };

    const checkCommentsDisplayed = useCallback(() => {
        const container = document.getElementById(`comments-container${index}`);

        if (container?.children?.length + 3 >= comments.length) {
            return true;
        } else {
            return false;
        }
    }, [index, comments.length]);

    useEffect(() => {
        checkCommentsDisplayed();
    }, [commentsNum, checkCommentsDisplayed]);

    return (
        <div className="comments-container" id={`comments-container${index}`}>
            {infoComments()}
            {post.isLoadingComments && <Loading />}
            {comments &&
                post.showingComments &&
                comments
                    .slice(0, commentsNum)
                    .map((comment, index) => (
                        <Comment key={index} comment={comment} />
                    ))}
            {commentsButtons()}
        </div>
    );
};

export default PostComments;
