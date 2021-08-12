import React from 'react';
import BrowseScreen from './BrowseScreen';
import QueryScreen from './QueryScreen';

export default function SearchScreen({ query }) {
    if (query === '') {
        return (
            <BrowseScreen />
        );
    } else {
        return (
            <QueryScreen query={query} />
        );
    }
};
