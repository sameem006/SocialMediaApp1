import React, { useContext } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import DataContext from "./context/DataContext";

const PostPage = () => {
      const { post, handleDelete, currentUser } = useContext(DataContext);
      const { id } = useParams();

      const posts = post.find((post) => post._id === id); // stored in posts so call from posts

      if (!posts) {
            return <Navigate to="/" replace />;
      }
      const isOwner = posts.userid === currentUser._id;

      return (
            <main className="PostPage">
                  <article className="post">
                        {posts && (
                              <>
                                    <h2>{posts.username}</h2>
                                    <h2>{posts.title}</h2>
                                    <p className="postDate">{posts.createdAt}</p>
                                    <p className="postBody">{posts.body}</p>

                                    {isOwner && (
                                          <>
                                                <Link to={`/edit/${id}`}>
                                                      <button className="editButton">Edit</button>
                                                </Link>
                                                <button className="deleteButton" onClick={() => handleDelete(posts._id)}>
                                                      Delete
                                                </button>
                                          </>
                                    )}
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
