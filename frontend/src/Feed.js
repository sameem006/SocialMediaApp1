import React, { useContext } from 'react';
import Post from './Post';
import DataContext from './context/DataContext';

const Feed = ({ post }) => {
    return (
        <>
            {post.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </>
    );
};

export default Feed;
