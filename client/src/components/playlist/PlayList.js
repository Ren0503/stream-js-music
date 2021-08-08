import React from 'react';

function PlayList({ top, bottom }) {
    return (
        <div className="playlists">
            <h1 className="play-title">playlists</h1>
            {top}
            <hr className="list-separator" />
            {bottom}
        </div>
    )
};

export default PlayList;