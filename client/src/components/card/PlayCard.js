import React, { useContext } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import putWithToken from 'services/putWithToken';
import { LoginContext, MessageContext, PlayContext, TokenContext } from 'context';
import CardInfo from './CardInfo';
import CardDisplay from './CardDisplay';
import Icon from 'components/icons';

const PlayCard = React.forwardRef(({ info, type }, ref) => {
    const history = useHistory();
    const description = returnDescription(type, info);
    const { name, id, uri } = info;

    const setMessage = useContext(MessageContext);
    const token = useContext(TokenContext);
    const loggedIn = useContext(LoginContext);
    const updatePlayer = useContext(PlayContext);
    const source = axios.CancelToken.source();

    let images;
    if (type === 'track') {
        images = info.album.images;
    } else {
        images = info.images;
    }

    let image_url;
    try {
        image_url = images[0].uri;
    } catch {
        image_url = null;
    }

    const playContext = () => {
        if (uri) {
            var body;
            if (type === 'track') {
                body = {
                    uris: [uri]
                }
            } else {
                body = {
                    context_uri: uri
                }
            }
            const request = putWithToken(`https://api.spotify.com/v1/me/player/play`, token, source, body);
            request()
                .then(response => {
                    if (response.status === 204) {
                        setTimeout(() => {
                            updatePlayer();
                        }, 1000);
                    } else {
                        setMessage(`ERROR: ${response}`);
                    }
                })
                .catch(error => setMessage(`ERROR: ${error}`))
        } else {
            history.push('/tracks');
        }
    }
    return (
        <div className='pcWrapper'>
            <Link
                to={info.to ? info.to : type === 'track' ? `/album/${info.album.id}?highlight=${id}` : `/${type}/${id}`}
                style={{ textDecoration: 'none', color: 'var(--main-text)', zIndex: '3' }}
            >
                <div ref={ref} className="PlayCard">
                    <CardDisplay url={image_url} type={type} />
                    <CardInfo title={name} description={description} />
                </div>
            </Link>
            {loggedIn
                ? <button className="smallButton no-outline" title="Play" onClick={() => {
                    playContext();
                    updatePlayer();
                }}>
                    <Icon name="Play" height="17" width="17" />
                </button>
                : <button className="smallButton no-outline" title="Play"
                    data-tip='play' data-for='tooltipMain' data-event='click'
                >
                    <Icon name="Play" height="17" width="17" />
                </button>
            }
        </div>
    )
});

function returnDescription(type, info) {
    let artist;
    switch (type) {
        case 'playlist':
            return info.description || `By ${info.owner.display_name}`;
        case 'album':
            artist = info.artist.map((object) => object.name);
            return artist.length === 1 ? artist[0] : artist.join(', ');
        case 'artist':
            return artist;
        case 'track':
            artist = info.artist.map((object) => object.name);
            return artist.length === 1 ? artist[0] : artist.join(', ');
        default:
            return null;
    }
};

export default PlayCard;
