import React from 'react';
import { useLocation } from 'react-router';

function HeaderBar({ children }) {
    const location = useLocation();

    return (
        <div className="header-bar" style={{background: location.pathname === '/'? null:'none'}}>
            {children}
        </div>
    );
};

export default HeaderBar;
