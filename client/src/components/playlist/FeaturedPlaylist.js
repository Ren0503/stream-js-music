import React from 'react';
import CreatePlaylist from './CreatePlaylist';

function FeaturedPlaylist({ children }) {
    return (
        <div className="featured-playlists"> 
            <CreatePlaylist />
            {children}
        </div>
    );
};

export default FeaturedPlaylist;
