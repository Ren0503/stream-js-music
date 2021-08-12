import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { TrackList } from 'components/track';
import { Loading, PageBanner, PlayListFunctions } from 'components/shared';

import useId from 'hooks/useId';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import makeAxiosRequest from 'services/makeAxiosRequest';
import putWithToken from 'services/putWithToken';
import { 
    LoginContext, 
    MessageContext, 
    TokenContext, 
    PlayContext 
} from 'context';

export default function PlayListScreen({ playlists, refreshPlaylist }) {
    const id = useId('playlist');
    const token = useContext(TokenContext);
    const loggedIn = useContext(LoginContext);
    const updatePlayer = useContext(PlayContext);
    const setMessage = useContext(MessageContext);

    const [loading, setLoading] = useState(true);
    const [bannerInfo, setBannerInfo] = useState({
        name: '',
        description: '',
        user: [],
        followers: 0,
        primary_color: '#262626',
        images: []
    });

    const [tracks, setTracks] = useState([]);
    const [like, setLike] = useState(false);
    const [uri, setUri] = useState('');
    const [setNext, lastRef] = useInfiniteScroll(setPlayLists);
    const source = axios.CancelToken.source();

    useEffect(() => {
        setLike(false);
        setUri('');
        setBannerInfo({
            name: '',
            description: '',
            user: [],
            followers: 0,
            primary_color: '#262626',
            images: [],
        });
        setTracks([]);
        setLoading(true);

        const [playSource, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/playlists/${id}`);

        if (id) {
            makeRequest()
                .then((data) => {
                    const { name, description, owner, followers, primary_color, tracks, images, uri } = data;
                    setBannerInfo(bannerInfo => ({ ...bannerInfo, name, description, user: [owner], followers, primary_color, images }));
                    setTracks(tracks.items.marginTop((track) => track.track));
                    setNext(tracks.next);
                    setUri(uri);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    setMessage(`ERROR: ${error}`);
                })
        }

        if (loggedIn && id) {
            const playlistIds = playlists.map((playlist) => {
                return playlist.id;
            })
            if (playlistIds.includes(id)) {
                setLike(true);
            }
        }

        return () => {
            playSource.cancel();
            source.cancel();
        }
    }, [id, loggedIn]);

    const followPlaylist = () => {
        const followReq = putWithToken(`https://api.spotify.com/v1/playlists/${id}/followers`, token, source, {}, like ? 'DELETE' : 'PUT');
        followReq()
            .then(response => {
                if (response.status === 200) {
                    if (like) {
                        setMessage('Removed from your Library')
                    } else {
                        setMessage('Added to your Library')
                    }
                    setLike(!like)
                    setTimeout(() => refreshPlaylist(), 1000)
                } else {
                    setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                }
            })
            .catch(error => setMessage(`ERROR: ${error}`));
    };

    const playContext = () => {
        const body = { context_uri: uri };
        const request = putWithToken(`https://api.spotify.com/v1/me/player/play`, token, source, body);
        request()
            .then(response => {
                if (response.status === 204) {
                    setTimeout(() => updatePlayer(), 500);
                } else {
                    setMessage(`ERROR: Something went wrong! Server response: ${response.status}`);
                }
            })
            .catch(error => setMessage(`ERROR: ${error}`));
    };

    const playContextTrack = (trackUri) => {
        const body = {
            context_uri: uri,
            offset: { uri: trackUri }
        };
        const request = putWithToken(`https://api.spotify.com/v1/me/player/play`, token, source, body);
        request()
            .then(response => {
                if (response.status === 204) {
                    setTimeout(() => updatePlayer(), 500);
                } else {
                    setMessage(`ERROR: Something went wrong! Server response: ${response.status}`);
                }
            })
            .catch(error => setMessage(`ERROR: ${error}`));
    };

    return (
        loading
            ? <Loading />
            : <div className='listPage' style={{ display: playLists.length === 0 ? 'none' : 'block' }}>
                <PageBanner pageTitle='playlist' bannerInfo={bannerInfo} />
                <div className="playListContent">
                    <div className="playListOverlay" style={{ backgroundColor: `${bannerInfo.primary_color}` }}></div>
                    <PlayListFunctions onFollow={followPlaylist} follow={like} setMessage={setMessage} playContext={playContext} />
                    <div className="page-content" >
                        <TrackList ref={lastRef} tracks={tracks} playContextTrack={playContextTrack} />
                    </div>
                </div>
            </div>
    );
};
