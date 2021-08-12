import React from 'react';

const styles = {
    fontSize: '28px',
    lineHeight: '1.6',
    fontWeight: '600',
    letterSpacing: '-.36px',
    color: '#fff',
    margin: '16px 0'
};

export default function ArtistRowTitle({ title }) {
    return (
        <div className="ArtistRowTitle">
            <h1 style={styles}>{title}</h1>
        </div>
    );
};
