import { createContext, useState, useEffect, Children } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/posts';
import useAxiosFetch from '../hooks/useAxiosFetch';
import useWindowSize from '../hooks/useWindowSize';
import Nav from '../Nav';
import Missing from '../Missing';
import NewPost from '../NewPost';
import Header from '../Header';
import Home from '../Home';
import PostPage from '../PostPage';
import About from '../About';
import { Route, Routes, Link } from 'react-router-dom';

import Post from '../Post';
import PostLayout from '../PostLayout';
import Footer from '../Footer';
import posts from '../api/posts';
import Edit from '../Edit';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [post, setPost] = useState([]);
    const [value, Setvalue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPost(data);
    }, [data]);

    useEffect(() => {
        const filteredResults = post.filter(
            (post) =>
                post.title.toLowerCase().includes(value.toLowerCase()) ||
                post.body.toLowerCase().includes(value.toLowerCase())
        );

        setSearchResults(filteredResults.reverse());
    }, [post, value]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = post.length ? post[post.length - 1].id + 1 : 1;
        console.log(typeof id);
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = {
            id,
            title: postTitle,
            datetime,
            body: postBody
        };
        try {
            const response = await api.post('/posts', newPost);
            const allpost = [...post, response.data];
            setPost(allpost);
            setPostTitle('');
            setPostBody('');
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else {
                console.log(`Error : ${err.message}`);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const delItems = post.filter((post) => post.id !== id);

            setPost(delItems);
            navigate('/');
        } catch (err) {
            console.log(`Error : ${err.message}`);
        }
    };

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {
            id,
            title: editTitle,
            datetime,
            body: editBody
        };

        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPost(post.map((post) => (post.id === id ? { ...response.data } : post)));
            setEditTitle('');
            setEditBody('');
            navigate('/');
        } catch (err) {
            console.log(err.message);
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
                searchResults
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
