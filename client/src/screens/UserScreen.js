import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CollectionRow } from 'components/row';
import { Loading, PageBanner, PlayListFunctions } from 'components/shared';
import { LoginContext, MessageContext, TokenContext, UserContext } from 'context';
import useId from 'hooks/useId';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import makeAxiosRequest from 'services/makeAxiosRequest';
import putWithToken from 'services/putWithToken';
import reqWithToken from 'services/reqWithToken';

export default function UserScreen({ query, setMessage }) {
    const id = useId();
    const user = useContext(UserContext);
    const token = useContext(TokenContext);
    const loggedIn = useContext(LoginContext);
    const setStatusMessage = useContext(MessageContext);

    const [loading, setLoading] = useState(true);
    const [bannerInfo, setBannerInfo] = useState({
        name: '',
        description: '',
        user: [],
        followers: 0,
        primary_color: 'rgb(83, 83, 83)',
        images: [],
        total: 0
    });
    const [playLists, setPlayLists] = useState([]);
    const [follow, setFollow] = useState(false);
    const [setNext, lastRef] = useInfiniteScroll(setPlayLists);
    const source = axios.CancelToken.source();
    useEffect(() => {
        setBannerInfo({
            name: '',
            description: '',
            user: [],
            followers: 0,
            primary_color: 'rgb(83, 83, 83)',
            images: [],
            total: 0
        });
        setFollow(false);
        setPlayLists([]);
        setLoading(true);

        const [userSource, requestUser] = makeAxiosRequest(`https://api.spotify.com/v1/users/${id}`);
        const [listSource, requestList] = makeAxiosRequest(`https://api.spotify.com/v1/users/${id}/playlists`);

        const makeRequest = async () => {
            try {
                const [userData, listData] = await Promise.all([requestUser(), requestList()]);

                const { display_name, owner, followers, primary_color, image } = userData;
                const { items, total, next } = listData;
                setBannerInfo(bannerInfo => ({ ...bannerInfo, name: display_name, user: [owner], followers, primary_color, images, total }));
                setPlayLists(items);
                setNext(next);
                setLoading(false);
            } catch (error) {
                setStatusMessage(`ERROR: ${error}`);
                setLoading(false);
            }
        }

        if (id) {
            makeRequest();
        }

        if (loggedIn && id) {
            const requestFollow = reqWithToken(`https://api.spotify.com/v1/me/following/contains?type=user&ids=${id}`, token, source);
            requestFollow()
                .then(response => {
                    setFollow(response.data[0]);
                })
                .catch(error => console.log(error));
        }

        return () => {
            userSource.cancel();
            listSource.cancel();
            source.cancel();
        }
    }, [id]);

    const followUser = () => {
        if (loggedIn) {
            const request = putWithToken(`https://api.spotify.com/v1/me/following?type=user&ids=${id}`, token, source, {}, follow ? 'DELETE' : 'PUT');
            request()
                .then(response => {
                    if (response.status === 204) {
                        if (follow) {
                            setStatusMessage(`Unsaved from your collection`);
                        } else {
                            setStatusMessage(`Saved to your collection`);
                        }
                        setFollow(!follow);
                    } else {
                        setStatusMessage(`ERROR: Something went wrong! Server response: ${response.status}`);
                    }
                })
                .catch(error => setStatusMessage(`ERROR: ${error}`));
        }
    }

    return (
        loading
            ? <Loading />
            : <div className='listPage' style={{ display: playLists.length === 0 ? 'none' : 'block' }}>
                <PageBanner pageTitle='profile' bannerInfo={bannerInfo} />
                <div className="playListContent">
                    <div className="playListOverlay" style={{ backgroundColor: `${bannerInfo.primary_color}` }}></div>
                    <PlayListFunctions type={id === user.id ? 'none' : 'user'} follow={follow} onFollow={followUser} setMessage={setStatusMessage} />
                    <div className="page-content" style={{ marginTop: '40px' }}>
                        <CollectionRow ref={lastRef} name='Public Playlists' id={null} playlists={playLists} />
                    </div>
                </div>
            </div>
    );
};
