import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DataContext from './context/DataContext';

const Edit = () => {
    const { post, editTitle, setEditTitle, editBody, setEditBody, handleEdit } =
        useContext(DataContext);
    const { id } = useParams();
    const posts = post.find((post) => post.id.toString() === id);
    useEffect(() => {
        if (posts) {
            setEditTitle(posts.title);
            setEditBody(posts.body);
        }
    }, [post, setEditBody, setEditTitle]);

    return (
        <main className="NewPost">
            {editTitle && (
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            placeholder="Enter your title"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Body:</label>
                        <input
                            id="postBody"
                            type="text"
                            placeholder="Enter your Body"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(posts.id)}>
                            Submit
                        </button>
                    </form>
                </>
            )}

            {!editTitle && (
                <>
                    <h2>Post not found</h2>
                    <p>that's disapointing</p>
                    <p>
                        <Link to="/">Visit our page</Link>
                    </p>
                </>
            )}
        </main>
    );
};

export default Edit;
