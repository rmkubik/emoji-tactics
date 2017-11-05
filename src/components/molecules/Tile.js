import React from 'react';
import PropTypes from 'prop-types';

export function Tile(props) {
    let className = "tile";
    if (props.tileSelected) {
        className += " tile-selected";
    }
    if (props.tileMoveHighlighted) {
        className += " tile-moveHighlighted";
    }
    if (props.tileActionHighlighted) {
        className += " tile-actionHighlighted";
    }
    let unitClassName = "unit";
    if (props.unit && props.unit.fsm.currentState === 'dead') {
        unitClassName += " animated fadeOutUp";
    }
    return (
        <button className={className} onClick={props.onClick}>
            <span className={unitClassName}>{props.unit ? props.unit.icon : ""}</span>
        </button>
    );
}

Tile.propTypes = {
    unit: PropTypes.object,
    onclick: PropTypes.func.isRequired,
    tileSelected: PropTypes.bool,
    tileMoveHighlighted: PropTypes.bool,
    tileActionHighlighted: PropTypes.bool
}