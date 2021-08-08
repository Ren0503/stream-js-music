import React from 'react';
import NavButton from 'components/shared/NavButton';

export default function HistoryNav() {
    return (
        <div className='HistoryNav'>
            <NavButton property='Back' />
            <NavButton property='Forward' />
        </div>
    );
};
