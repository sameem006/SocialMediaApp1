import React, { useContext } from 'react';
import DataContext from './context/DataContext';

const NewPost = () => {
    const { postTitle, setPostTitle, postBody, setPostBody, handleSubmit } =
        useContext(DataContext);
    return (
        <main className="NewPost">
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    placeholder="Enter your title"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Body:</label>
                <input
                    id="postBody"
                    type="text"
                    placeholder="Enter your Body"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    );
};

export default NewPost;
