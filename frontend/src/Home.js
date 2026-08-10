import React, { useContext } from 'react';
import Feed from './Feed';
import DataContext from './context/DataContext';
const Home = () => {
    const { post, searchResults, fetchError, isLoading } = useContext(DataContext);
    return (
        <main className="Home">
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && (
                <p className="statusMsg" style={{ color: 'red' }}>
                    {fetchError}
                </p>
            )}
            {!isLoading &&
                !fetchError &&
                (post.length ? (
                    <Feed post={searchResults} />
                ) : (
                    <p style={{ marginTop: '2rem' }}>No posts available</p>
                ))}
        </main>
    );
};

export default Home;
