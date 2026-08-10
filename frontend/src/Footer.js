import React from 'react';

const Footer = () => {
    const year = new Date();
    return <footer className="Footer">copyright &copy; {year.getFullYear()}</footer>;
};

export default Footer;
