import React, { useContext } from 'react';
import ReactToolTip from 'react-tooltip';
import { Route, Switch, Redirect } from 'react-router-dom';
import { 
    HomeScreen,
    SearchScreen,
    GenreScreen,
    PlayListScreen,
    AlbumScreen,
    ArtistScreen,
    UserScreen,
    CollectionScreen,
    LikeScreen,
} from 'screens';
import { LoginContext } from 'context';
import generateContent from 'context/TipContent';

export default function PageContent({ query, playlists, refreshPlaylist, message, status }) {
    const loggedIn = useContext(LoginContext);
    return (
        <>
            <Switch>
                <Route exact path='/'>
                    <HomeScreen />
                </Route>
                <Route path={'/search'}>
                    <SearchScreen query={query} />
                </Route>
                <Route path='/genre'>
                    <GenreScreen />
                </Route>
                <Route path='/playlist'>
                    <PlayListScreen playlists={playlists} refreshPlaylist={refreshPlaylist} />
                </Route>
                <Route path='/album'>
                    <AlbumScreen />
                </Route>
                <Route path='/artist'>
                    <ArtistScreen />
                </Route>
                <Route path='/user'>
                    <UserScreen />
                </Route>
                <Route path='/collection'>
                    {loggedIn ? <Redirect to='/collection/playlist' /> : <Redirect to='/' />}
                    <CollectionScreen playlists={playlists} />
                </Route>
                <Route path='/tracks'>
                    {loggedIn ? <LikeScreen /> : <Redirect to='/' />}
                </Route>
            </Switch>
            <div className={`status-bar-wrapper ${status ? 'active' : ''}`}>
                <div className={`status-bar ${status ? 'active' : ''}`}>{message}</div>
            </div>
            <ReactToolTip 
                className="toolTip ttMain"
                id="tooltipMain"
                disable={loggedIn} place='bottom' 
                effect='solid'  backgroundColor= '#2e77d0' 
                globalEventOff='click' 
                getContent={dataTip => generateContent(dataTip)} 
                clickable={true}
            />
        </>
    );
};