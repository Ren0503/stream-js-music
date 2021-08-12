import React from 'react';
import PlayCard from 'components/card/PlayCard';

export default function SearchRowGrid({ type, info }) {
    return (
        <div className="RowGrid">
            {info.map((item) => {
                return <PlayCard key={item.id} info={info} type={type} />
            })}
        </div>
    );
};
