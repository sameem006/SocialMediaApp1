import Nav from './Nav';
import Missing from './Missing';
import NewPost from './NewPost';
import Header from './Header';
import Home from './Home';
import PostPage from './PostPage';
import About from './About';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Post from './Post';
import PostLayout from './PostLayout';
import Footer from './Footer';
import api from './api/posts';
import posts from './api/posts';
import Edit from './Edit';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
import { DataProvider } from './context/DataContext';

function App() {
    return (
        <div className="App">
            <DataProvider>
                <Header title={'social media'} />
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="post">
                        <Route index element={<NewPost />} />

                        <Route path=":id" element={<PostPage />} />
                    </Route>
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<Missing />} />
                </Routes>
                <Footer />
            </DataProvider>
        </div>
    );
}

export default App;
