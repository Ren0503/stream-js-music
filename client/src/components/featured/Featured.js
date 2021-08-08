import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import CollectionNav from './CollectionNav';
import HeaderBar from './HeaderBar';
import HistoryNav from './HistoryNav';
import SearchBar from './SearchBar';
import { UserInfo } from './UserInfo';
import UserPrompt from './UserPrompt';

export default function Featured(props) {
    const loggedIn = props.loggedIn;
    const [query, setQuery] = useState('');

    const resetQuery = () => {
        setQuery('');
    }

    return (
        <div className="featured">
            <HeaderBar>
                <HistoryNav />

                <Route exact path='/search'>
                    <SearchBar query={query} setQuery={setQuery} resetQuery={resetQuery} />
                </Route>

                <Route path='/collection'>
                    <CollectionNav />
                </Route>

                {loggedIn ? <UserInfo /> : <UserPrompt />}
            </HeaderBar>
        </div>
    );
};
