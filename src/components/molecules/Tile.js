import React from 'react';
import PropTypes from 'prop-types';
import {Unit} from './Unit.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class Tile extends React.Component {
    render() {
        let className = "tile";
        if (this.props.tileSelected) {
            className += " tile-selected";
        }
        if (this.props.tileMoveHighlighted) {
            className += " tile-moveHighlighted";
        }
        if (this.props.tileActionHighlighted) {
            className += " tile-actionHighlighted";
        }
        let unit = [];
        if (this.props.unit !== null) {
            unit = <Unit unit={this.props.unit}/>;
        }
        return (
            // if unit fsm state is dead, then leave animation changes
            // if ()
            <button className={className} onClick={this.props.onClick}>
                <ReactCSSTransitionGroup 
                    transitionName="unit-move"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {unit}
                </ReactCSSTransitionGroup>
            </button>
        )
    }
}

Tile.propTypes = {
    unit: PropTypes.object,
    onclick: PropTypes.func.isRequired,
    tileSelected: PropTypes.bool,
    tileMoveHighlighted: PropTypes.bool,
    tileActionHighlighted: PropTypes.bool
}