import React, { useState, useEffect } from 'react';
import './CSS/Footer.css';

const Footer = () => {
    const [showFooter, setShowFooter] = useState(false);

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setShowFooter(true);
        } else {
            setShowFooter(false); 
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className={`footer fixed-bottom bg-dark py-3 ${showFooter ? '' : 'hide-footer'}`}>
            <div className="container">
                <p className="float-end mb-1">
                    <a href="#top">Back to Top</a>
                </p>
                <p className=" text-white mb-1 d-flex justify-content-start">
                    © 2024 Software Developer: Development by: <b>Suryabhan Kushwaha</b>.
                    Want to learn from my classes? <a href="/">Visit the home page</a> to get started!
                </p>
            </div>
        </footer>
    );
};

export default Footer;
