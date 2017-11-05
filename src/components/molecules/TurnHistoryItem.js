import React from 'react';
import PropTypes from 'prop-types';

export function TurnHistoryItem(props) {
    const desc = props.turnNumber ?
        `Move # ${props.turnNumber} - Player ${props.historyStep.action.player.id}'s 
        ${props.historyStep.action.unit.icon} ${props.historyStep.action.action} targeted:
        (${props.historyStep.action.target.x}, ${props.historyStep.action.target.x})` :
        'Game start';
    const fontWeight = props.isCurrentTurn ? "bold" : "normal";

    return (
        <li style={{fontWeight: fontWeight}}>
            <a href="#" onClick={props.onClick}>{desc}</a>
        </li>
    );
}

TurnHistoryItem.propTypes = {
    historyStep: PropTypes.object.isRequired,
    turnNumber: PropTypes.number.isRequired,
    isCurrentTurn: PropTypes.bool,
    onClick: PropTypes.func,
}

TurnHistoryItem.defaultProps = {
    isCurrentTurn: false
}