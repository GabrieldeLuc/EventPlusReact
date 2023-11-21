import React from 'react';
import './Footer.css';

const Footer = ( {textRights = "Escola Senai de informática - 2023"}) => {
    return (
        <footer className='footerpage'>
            <p className='footer__rights'>{textRights}</p>
        </footer>
    );
};

export default Footer;