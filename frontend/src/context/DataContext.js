import { createContext, useState, useEffect, Children } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";
import useWindowSize from "../hooks/useWindowSize";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
      const [post, setPost] = useState([]);
      const [value, Setvalue] = useState("");
      const [searchResults, setSearchResults] = useState([]);
      const [postTitle, setPostTitle] = useState("");
      const [postBody, setPostBody] = useState("");
      const [editTitle, setEditTitle] = useState("");
      const [editBody, setEditBody] = useState("");
      const navigate = useNavigate();
      const { width } = useWindowSize();
      const [fetchError, setFetchError] = useState("");
      const [isLoading, setIsLoading] = useState(true);
      const [checkingAuth, setCheckingAuth] = useState(true);
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [currentUser, setCurrentUser] = useState(null);

      useEffect(() => {
            const checkLogin = async () => {
                  try {
                        const res = await api.get("/auth/check");

                        if (res.status === 200) {
                              setIsLoggedIn(true);
                              setCurrentUser(res.data.user);
                        } else {
                              setIsLoggedIn(false);
                              setCurrentUser(null);
                        }
                  } catch (err) {
                        console.log(err);
                        setIsLoggedIn(false);
                        setCurrentUser(null);
                  } finally {
                        setCheckingAuth(false);
                  }
            };

            checkLogin();
      }, []);
      useEffect(() => {
            if (checkingAuth) return;

            if (!isLoggedIn) {
                  setPost([]);
                  setIsLoading(false);
                  return;
            }
            const getPosts = async () => {
                  try {
                        setIsLoading(true);
                        const res = await api.get("/post/getposts");
                        setPost(res.data);
                  } catch (error) {
                        setFetchError(error.message);
                  } finally {
                        setIsLoading(false);
                  }
            };

            getPosts();
      }, [checkingAuth, isLoggedIn]);

      useEffect(() => {
            const filteredResults = post.filter((post) => post.title.toLowerCase().includes(value.toLowerCase()) || post.body.toLowerCase().includes(value.toLowerCase()));

            setSearchResults(filteredResults.reverse());
      }, [post, value]);

      const handleSubmit = async (e) => {
            e.preventDefault();
            const datetime = format(new Date(), "MMMM dd, yyyy pp");
            const newPost = {
                  title: postTitle,
                  body: postBody,
            };
            try {
                  const response = await api.post("/post/createpost", newPost);
                  setPost((prev) => [response.data.post, ...prev]);
                  setPostTitle("");
                  setPostBody("");
            } catch (err) {
                  if (err.response) {
                        console.log(err.response?.data || err.message);
                  } else {
                        console.log(`Error : ${err.message}`);
                  }
            }
      };

      const handleDelete = async (id) => {
            try {
                  await api.delete(`/post/${id}`);
                  const delItems = post.filter((post) => post._id !== id);
                  navigate("/");

                  setPost(delItems);
            } catch (err) {
                  console.log(`Error : ${err.message}`);
            }
      };

      const handleEdit = async (id) => {
            const datetime = format(new Date(), "MMMM dd, yyyy pp");
            const updatedPost = {
                  title: editTitle,
                  body: editBody,
            };

            try {
                  const response = await api.put(`/post/${id}`, updatedPost);
                  setPost(post.map((post) => (post._id === id ? { ...response.data } : post)));
                  setEditTitle("");
                  setEditBody("");
                  navigate("/");
            } catch (err) {
                  console.log(err.response?.data || err.message);
            }
      };
      return (
            <DataContext.Provider
                  value={{
                        width,
                        value,
                        Setvalue,
                        post,
                        fetchError,
                        isLoading,
                        editTitle,
                        setEditTitle,
                        editBody,
                        setEditBody,
                        handleEdit,
                        handleDelete,
                        postTitle,
                        setPostTitle,
                        postBody,
                        setPostBody,
                        handleSubmit,
                        searchResults,
                        isLoggedIn,
                        setIsLoggedIn,
                        checkingAuth,
                        currentUser,
                        setCurrentUser,
                  }}
            >
                  {children}
            </DataContext.Provider>
      );
};

export default DataContext;
