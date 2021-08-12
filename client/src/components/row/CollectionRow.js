import React from 'react';
import RowGrid from './RowGrid';
import RowTitle from './RowTitle';

const CollectionRow = React.forwardRef(({ name, playlists, id }, ref) => {
    return (
        <div className="CollectionRow">
            <RowTitle title={name} id={id} />            
            <RowGrid ref={ref} playlists={playlists} />
        </div>
    )
});

export default CollectionRow
