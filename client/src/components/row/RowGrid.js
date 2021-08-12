import React from 'react';
import { PlayCard } from 'components/card';

const RowGrid = React.forwardRef(({playlists}, ref) => {
    return (
        <div className="RowGrid">
            {playlists.map((playlists, index) => {
                if (playlists) {
                    if (index + 1 < playlists.length) {
                        return <PlayCard key={playlist.id} info={playlist} type={playlist.type} />
                    } else {
                        return <PlayCard ref={ref} key={playlist.id} info={playlist} type={playlist.type} />
                    }
                } else {
                    return null;
                }
            })}
        </div>
    )
});

export default RowGrid;
