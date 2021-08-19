import React, { useEffect, useState } from 'react';
import makeAxiosRequest from 'services/makeAxiosRequest';
import SearchRowGrid from './SearchRowGrid';
import SearchRowTitle from './SearchRowTitle';

export default function SearchRow({ title, type, query }) {
    const [results, setResults] = useState([]);
    const [formatedQuery, setFormatedQuery] = useState('');

    useEffect(() => {
        const formatedQuery = query.toLowerCase().split().join('+');
        setFormatedQuery(formatedQuery);
    }, [query]);

    useEffect(() => {
        const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/search?q=${formatedQuery}&type=${type}&limit=9`);
        if (formatedQuery.length > 0) {
            makeRequest()
                .then((data) => {
                    const key = Object.keys(data)[0];
                    const result = data[key].items;
                    setResults(result);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        return () => source.cancel();
    }, [formatedQuery, type])
    return (
        <div className='CollectionRow' style={{ display: results.length === 0 ? 'none' : 'grid' }}>
            <SearchRowTitle title={title} />
            <SearchRowGrid type={type} info={results} />
        </div>
    )
}
