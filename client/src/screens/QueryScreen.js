import React from 'react';
import { SearchRow } from 'components/search';

export default function QueryScreen({ query }) {
    return (
        <div className="page-content">
            <div className="pageContent">
                <SearchRow title="Songs" type="track" query={query} />
                <SearchRow title="Artists" type="artist" query={query} />
                <SearchRow title="Albums" type="album" query={query} />
                <SearchRow title="Playlists" type="playlists" query={query} />
            </div>
        </div>
    );
};
