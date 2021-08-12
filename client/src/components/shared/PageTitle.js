import React from 'react';

const styles = {
    fontSize: '24px',
    fontWeight: '700',
    lineHeight: '28px',
    letterSpacing: '-.04em',
    textTransform: 'none',
    color: '#fff'
};

export default function PageTitle({ name }) {
    return (
        <div className='PageTitle'>
            <h1 style={styles}>{name}</h1>
        </div>
    )
}