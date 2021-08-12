import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '16px',
    letterSpacing: 'normal',
    textTransform: 'none'
}

const AboutNavItem = ({ label, to }) => {
    return (
        <li className='AboutNavItem'>
            <NavLink exact to={to} className='aboutLink' activeClassName='aboutLink-active'>
                <span style={styles}>{label}</span>
            </NavLink>
        </li>
    )
};

export default AboutNavItem;
