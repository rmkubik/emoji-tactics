import React from 'react';
import PropTypes from 'prop-types';
import {TurnHistoryItem} from '../molecules/TurnHistoryItem.js';

export function TurnHistoryList(props) {
    const historyListItems = props.history.map((historyStep, turnNumber) => {
        return (
            <TurnHistoryItem
                key={turnNumber}
                turnNumber={turnNumber}
                historyStep={historyStep}
                isCurrentTurn={props.currentTurnNumber === turnNumber}
                onClick={() => props.itemOnClick(turnNumber)}
            />
        );
    });

    return (
        <ol>{historyListItems}</ol>
    )
}

TurnHistoryList.PropTypes = {
    history: PropTypes.object.isRequired,
    currentTurnNumber: PropTypes.number.isRequired,
    itemOnClick: PropTypes.func
}
