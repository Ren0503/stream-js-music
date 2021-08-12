import React, { useContext, useEffect, useState } from 'react';
import { PlayCard } from 'components/card';
import { PageTitle } from 'components/shared';
import { MessageContext } from 'context';
import useId from 'hooks/useId';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import makeAxiosRequest from 'services/makeAxiosRequest';

export default function GenreScreen() {
    const id = useId();
    const setMessage = useContext(MessageContext);

    const [playLists, setPlayLists] = useState([]);
    const [name, setName] = useState('');
    const [setNext, lastRef] = useInfiniteScroll(setPlayLists);

    useEffect(() => {
        const [nameSource, requestName] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories/${id}`)
        const [listSource, requestList] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=50`)

        const makeRequest = async () => {
            try {
                const [nameData, listData] = await Promise.all([requestName(), requestList()]);
                setName(nameData.name);
                setPlayLists(listData.playlists.items);
                setNext(listData.playlists.next);
            } catch (error) {
                setMessage(error);
            }
        };

        if (id) {
            makeRequest();
        }

        return () => {
            nameSource.cancel();
            listSource.cancel();
        }
    }, [id]);

    return (
        <div className="GenrePage page-content">
            <PageTitle name={name} />
            <div className="browseGrid">
                {playLists.map(playlist => (
                    <PlayCard ref={lastRef} key={playlist.id} info={playlist} type="playlist" />
                ))}
            </div>
        </div>
    );
};
