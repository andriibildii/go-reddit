import Card from '../../components/Card/Card';
import PostHeader from './PostHeader/PostHeader';
import PostBody from './PostBody/PostBody';
import PostComments from './PostComments/PostComments';
import './Post.css';

const Post = ({ post, index }) => {
    return (
        <Card className="post">
            <PostHeader post={post} />
            <PostBody post={post} />
            <PostComments post={post} index={index} />
        </Card>
    );
};

export default Post;
