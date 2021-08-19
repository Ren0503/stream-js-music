import React from 'react';
import logo from 'assets/header.png';

//Spotify icon logo with letter in svg format
export default function Logo() {
    return (
        <a href="/" className="logo-link no-outline">
            <div className='logo'>
                <img src={logo} height="40" />
            </div>
        </a>
    )
};