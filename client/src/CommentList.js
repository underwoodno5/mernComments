import React from 'react';
import Proptypes from 'prop-types';
import Comment from './Comment';

const CommentList = (props) => {
    const commentNodes = props.data.map(comment => (
        <Comment author={comment.author} key={comment._id} id={commend._id}>
        {comment.text}
        </Comment>
    ));
    return(
        <div>
            { commentNodes }
        </div>
    );
};

CommentList.propTypes = {
    data: propTypes.arrayOf(Proptypes.shape({
        author: PropTypes.string,
        id: Proptypes.string,
        text: Proptypes.string,
    })),
};

CommentList.defaultProps = {
    data: [],
};
export default CommentList;