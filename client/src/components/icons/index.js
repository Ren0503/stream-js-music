import React from 'react';
/* eslint-disable import/first */

import HomeIcon from './HomeIcon';
import SearchIcon from './SearchIcon';
import LibraryIcon from './LibraryIcon';
import CreateIcon from './CreateIcon';
import LikeIcon from './LikeIcon';
import InstallIcon from './InstallIcon';
import BackIcon from './BackIcon';
import ForwardIcon from './ForwardIcon';
import NSearchIcon from './NSearchIcon';
import HeartIcon from './HeartIcon';
import PlayIcon from './PlayIcon';
import MusicIcon from './MusicIcon';;
import Music2Icon from './Music2Icon';
import CDIcon from './CDIcon';
import TrackBackIcon from './TrackBackIcon';
import TrackNextIcon from './TrackNextIcon';
import ShuffleIcon from './ShuffleIcon';
import RepeatIcon from './RepeatIcon';
import SpeakerIcon from './SpeakerIcon';
import VolumeIcon from './VolumeIcon';
import PauseIcon from './PauseIcon';

export default function Icon(props) {
    switch (props.name) {
        case 'Home':
            return <HomeIcon />
        case 'Search':
            return <SearchIcon />
        case 'Library':
            return <LibraryIcon />
        case 'Create':
            return <CreateIcon />
        case 'Heart':
            return <HeartIcon {...props}/>
        case 'Like':
            return <LikeIcon {...props}/>
        case 'Install':
            return <InstallIcon {...props}/>
        case 'Back':
            return <BackIcon />
        case 'Forward':
            return <ForwardIcon />
        case 'N-Search':
            return <NSearchIcon />
        case 'Play':
            return <PlayIcon {...props}/>
        case 'Music':
            return <MusicIcon />
        case 'Music2':
            return <Music2Icon />
        case 'CD':
            return <CDIcon />
        case 'TrackBack':
            return <TrackBackIcon />
        case 'TrackNext':
            return <TrackNextIcon />
        case 'Shuffle':
            return <ShuffleIcon />
        case 'Repeat':
            return <RepeatIcon />
        case 'Speaker':
            return <SpeakerIcon />
        case 'Volume':
            return <VolumeIcon />
        case 'Pause':
            return <PauseIcon />
        default:
            return null;
    }
}
