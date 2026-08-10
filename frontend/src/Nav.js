import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import DataContext from './context/DataContext';

const Nav = () => {
    const { value, Setvalue } = useContext(DataContext);
    return (
        <nav className="Nav">
            <form className="searchForm">
                <label htmlFor="search">Search</label>
                <input
                    id="search"
                    type="text"
                    placeholder="search Posts"
                    value={value}
                    onChange={(e) => {
                        Setvalue(e.target.value);
                    }}
                />
            </form>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/post">Post</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
