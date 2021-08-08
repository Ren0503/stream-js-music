import React from 'react';
import Icon from 'components/icons';

export default function ControlButton({
    title,
    icon,
    size,
    active,
    onClick,
    extraClass
}) {
    return (
        <button title={title} className={`control-button ${size && size} ${active? 'active':''} ${extraClass&&extraClass} no-outline`} onClick={onClick}>
           <Icon name={icon} /> 
        </button>
    );
};
