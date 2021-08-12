import React, { useEffect, useState } from 'react';
import makeAxiosRequest from 'services/makeAxiosRequest';
import { BrowseCard, PageTitle } from 'components/shared';

export default function BrowseScreen() {
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const [source, makeRequest] = makeAxiosRequest('https://api.spotify.com/v1/browse/categories?limit=50');

        makeRequest()
            .then((data) => {
                setGenre(data.catagories.items);
            })
            .catch((error) => console.log(error));

        return () => source.cancel();
    }, []);

    return (
        <div className="page-content">
            <div className="browsePage">
                <PageTitle name="Browse All"/>
                <div className="browseGrid">
                    {genre.map((genre) => {
                        return <BrowseCard key={genre.id} info={genre} />
                    })}
                </div>
            </div>
        </div>
    )
}
