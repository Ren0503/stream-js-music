import React from 'react';
import Icon from 'components/icons';

function InstallCTA() {
    return (
        <div className='cta-wrapper'>
            <a href="https://spotify.com/download" className='nav-link'>
                <div className="nav-icon install-icon">
                    <Icon name='Install' viewBox='0 0 20 20' width='20px' height='20px' />
                </div>
                <span>Install App</span>
            </a>
        </div>
    );
};

export default InstallCTA;
