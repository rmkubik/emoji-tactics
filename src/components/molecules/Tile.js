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
        let animation = "unit-move";
        if (this.props.unit !== null) {
            if (this.props.unit.fsm.currentState === "dead") {
                animation = "unit-dead";
            } else {
                unit = <Unit 
                    unit={this.props.unit}
                    action={this.props.unitAction}
                />;
            }
        }
        return (
            <button className={className} onClick={this.props.onClick}>
                <ReactCSSTransitionGroup 
                    transitionName={animation}
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
    unitAction: PropTypes.string,
    onclick: PropTypes.func.isRequired,
    tileSelected: PropTypes.bool,
    tileMoveHighlighted: PropTypes.bool,
    tileActionHighlighted: PropTypes.bool
}