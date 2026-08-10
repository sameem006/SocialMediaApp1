import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import DataContext from './context/DataContext';

const PostPage = () => {
    const { post, handleDelete } = useContext(DataContext);
    const { id } = useParams();

    const posts = post.find((post) => post.id.toString() === id); // stored in posts so call from posts

    return (
        <main className="PostPage">
            <article className="post">
                {posts && (
                    <>
                        <h2>username</h2>
                        <h2>{posts.title}</h2>
                        <p className="postDate">{posts.datetime}</p>
                        <p className="postBody">{posts.body}</p>

                        <Link to={`/edit/${id}`}>
                            <button className="editButton">Edit </button>
                        </Link>
                        <button className="deleteButton " onClick={() => handleDelete(posts.id)}>
                            Delete
                        </button>
                    </>
                )}

                {!posts && (
                    <>
                        <h2>Post not found</h2>
                        <p>that's disapointing</p>
                        <p>
                            <Link to="/">Visit our page</Link>
                        </p>
                    </>
                )}
            </article>
        </main>
    );
};

export default PostPage;
