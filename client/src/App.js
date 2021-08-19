import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import getHashParams from 'utils/getHashParams';
import reqWithToken from 'services/reqWithToken';
import { Loading } from 'components/shared';
import { LoginContext, MessageContext, PlayContext, TokenContext, UserContext } from 'context';
import { CTABanner, Footer, InstallCTA, Logo, NavItem, NavList, Sidebar } from 'components/core';
import { FeaturedItem, FeaturedPlaylist, OtherPlaylist, PlayList } from 'components/playlist';
import { Featured } from 'components/featured';
import { Player } from 'components/player';

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [playlists, setPlaylists] = useState([]);

  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('');

  const timerRef = useRef(null);

  useEffect(() => {
    var params = getHashParams();
    const { access_token, error } = params;

    var cancelSource = Axios.CancelToken.source();

    if (error) {
      setLoading(false);
      setStatusMessage(`Error: ${error}`);
    } else {
      if (access_token) {
        setToken(access_token);
        setLoggedIn(true);
        window.location.hash = '';

        const makeRequests = async () => {
          const requestUserInfo = reqWithToken('https://api.spotify.com/v1/me', access_token, cancelSource);
          const requestPlayList = reqWithToken(`https://api.spotify.com/v1/me/playlists`, access_token, cancelSource);

          try {
            const [_userInfo, _playlists] = await Promise.all([requestUserInfo(), requestPlayList()]);
            setUserInfo(_userInfo.data);
            setPlaylists(_playlists.data.items);
          } catch (error) {
            setStatusMessage(`Login Error: ${error}`);
          }
        }

        makeRequests();
        setLoading(false);
      } else {
        Axios(`${process.env.REACT_APP_BACK_URI}/refresh_token`, { withCredentials: true })
          .then((response) => {
            const access_token = response.data.access_token;
            setToken(access_token);
            setLoggedIn(true);

            const makeRequests = async () => {
              const requestUserInfo = reqWithToken('https://api.spotify.com/v1/me', access_token, cancelSource);
              const requestPlayList = reqWithToken(`https://api.spotify.com/v1/me/playlists`, access_token, cancelSource);

              try {
                const [_userInfo, _playlists] = await Promise.all([requestUserInfo(), requestPlayList()]);
                setUserInfo(_userInfo.data);
                setPlaylists(_playlists.data.items);
              } catch (error) {
                console.log(error);
              }
            }

            makeRequests();
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            return;
          })
      }
    }
    return () => {
      cancelSource.cancel();
      clearTimeout(timerRef.current);
    }
  }, []);

  const setStatusMessage = (message) => {
    clearTimeout(timerRef.current);
    setStatus(true);
    setMessage(message);
    timerRef.current = setTimeout(() => {
      setStatus(false);
    }, 3000);
  };

  const refreshPlaylist = () => {
    const source = Axios.CancelToken.source();
    const requestPlayList = reqWithToken(`https://api.spotify.com/v1/me/playlists`, token, source);
    requestPlayList()
      .then(response => setPlaylists(response.data.items))
      .catch(error => console.log(error))
  };

  const playerRef = useRef(null);
  const updatePlayer = () => {
    playerRef.current.updatePlayer();
  };

  return (
    <div className="App">
      {loading
        ? <Loading type="app" />
        : <MessageContext.Provider value={setStatusMessage}>
          <LoginContext.Provider value={loggedIn}>
            <Sidebar>
              <Logo />
              <NavList>
                <NavItem to='/' exact={true} name="Home" label="Home" />
                <NavItem to='/search' exact={true} name='Search' label='Search' />
                <NavItem 
                  to='/collection' exact={false} 
                  name='Library' label='Your Library' 
                  data_tip='library' data_for='tooltip' 
                  data_event='click' style={{ pointerEvents: loggedIn? 'auto':'none'}}
                />
              </NavList>
              <PlayList 
                top={<FeaturedPlaylist>
                  <FeaturedItem label="Liked Songs" loggedIn={loggedIn} />
                </FeaturedPlaylist>}
                bottom={<OtherPlaylist playlists={playlists} />}
              />
              {loggedIn ? <InstallCTA />: null}
            </Sidebar>

            <PlayContext.Provider value={updatePlayer}>
              <TokenContext.Provider value={token}>
                <UserContext.Provider value={userInfo}>
                  <Featured 
                    loggedIn={loggedIn}
                    playlists={playlists}
                    refreshPlaylist={() => refreshPlaylist()}
                    message={message}
                    status={status}
                  />
                </UserContext.Provider>
              </TokenContext.Provider>
            </PlayContext.Provider>

            <Footer>
              {loggedIn ? <Player token={token} ref={playerRef} /> : <CTABanner />}
            </Footer>
          </LoginContext.Provider>
        </MessageContext.Provider>
      }
    </div>
  );
};

export default App;
