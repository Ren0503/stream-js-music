import React from 'react';

const styles = {
    fontSize: '24px',
    lineHeight: '28px',
    letterSpacing: '-0.04em',
    fontWeight: '700',
    color: 'white'
}

export default function RowTitle({ title, id }) {
    return (
        <div className="RowTitle">
            <h1 style={styles}>{title}</h1>
            {id ? <a href={`/genre/${id}`} className='seeAll'>see all</a> : null}
        </div>
    );
};
