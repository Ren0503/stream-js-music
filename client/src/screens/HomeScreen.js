import { CollectionRow } from 'components/row';
import { MessageContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
import makeAxiosRequest from 'services/makeAxiosRequest';
import getLocale from 'utils/getLocale';

export default function HomeScreen() {
    const setMessage = useContext(MessageContext);
    const [temp, setTemp] = useState({});
    const [collections, setCollections] = useState([]);
    const [playlistsMap, setPlaylistsMap] = useState({});

    useEffect(() => {
        const [language, locale] = getLocale();
        const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories?limit=6&country=${locale}&locale=${language}_${locale}`);
        makeRequest()
            .then((data) => {
                setCollections(data.categories.items);
            })
            .catch((error) => setMessage(`ERROR: ${error}`));
        return () => source.cancel();
    }, []);

    useEffect(() => {
        collections.map((collection) => {
            const { name, id } = collection;
            var [, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=9`);
            makeRequest()
                .then((data) => {
                    const playlists = data.playlists.items;
                    setTemp(temp => ({ [name]: { id, playlists } }));
                })
                .catch((error) => setMessage(`ERROR: ${error}`));
            return null;
        });
    }, [collections]);

    useEffect(() => {
        setPlaylistsMap(playlistsMap => ({ ...playlistsMap, ...temp }));
    }, [temp]);

    return (
        <div className="page-content">
            <div className="pageContent">
                <CollectionRow name='Uniquely Yours' id={null} playlists={[{
                    id: '',
                    to: '/tracks',
                    description: '',
                    name: 'Liked Songs',
                    images: [{
                        url: 'https://misc.scdn.co/liked-songs/liked-songs-300.png'
                    }]
                }]} />
                {
                    Object.entries(playlistsMap).map(([name, info]) => {
                        const { id, playlists } = info;
                        return <CollectionRow name={name} key={id} id={id} playlists={playlists} />
                    })
                }
            </div>
        </div>
    )
}
