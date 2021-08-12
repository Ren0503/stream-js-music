import TrackList from 'components/track/TrackList';
import React from 'react';
import ArtistRowGrid from './ArtistRowGrid';
import ArtistRowTitle from './ArtistRowTitle';

const ArtistRow = ({ title, display, list, playContextTrack }) => {
    if (list && list.length > 0) {
        return (
            <div>
                <ArtistRowTitle title={title} />
                {display === 'list'
                    ? <TrackList tracks={list} styleName='simplify' playContextTrack={playContextTrack} />
                    : <ArtistRowGrid list={list} />
                }
            </div>
        )
    } else {
        return null;
    }
}

export default ArtistRow;
