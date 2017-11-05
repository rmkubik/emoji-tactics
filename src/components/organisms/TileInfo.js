import React from 'react';
import PropTypes from 'prop-types';

export function TileInfo(props) {
    let unitInfo = {
        icon: null,
        health: null,
        moves: null,
        range: null,
        damage: null
    };
    if (props.unit) {
        unitInfo = props.unit;
    } 
    return (
        <ul>
            <li>Tile: {unitInfo.icon}</li>
            <li>Health: {unitInfo.health}</li>
            <li>Moves: {unitInfo.moves}</li>
            <li>Range: {unitInfo.range}</li>
            <li>Damage: {unitInfo.damage}</li>
        </ul>
    );
}

TileInfo.propTypes = {
    unit: PropTypes.object
}