import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
    backgroundColor: '#333'
};

const CollectionNav = () => {
    return (
        <div className="cNavWrapper">
            <nav className="cNav">
                <ul className="cNavList">
                    <li>
                        <NavLink to='/collection/playlist' activeStyle={activeStyle}>Playlists</NavLink> 
                    </li>
                    <li>
                        <NavLink to='/collection/artist' activeStyle={activeStyle}>Artists</NavLink>
                    </li>
                    <li>
                        <NavLink to='/collection/album' activeStyle={activeStyle}>Albums</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default CollectionNav;
