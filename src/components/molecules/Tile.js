import React from 'react';
import PropTypes from 'prop-types';

export class Tile extends React.Component {
    componentDidMount() {
        const unitElement = this.refs.unit
        unitElement.addEventListener('animationend', () => {
            unitElement.remove();
        });
    }

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
        let unitClassName = "unit";
        if (this.props.unit && this.props.unit.fsm.currentState === 'dead') {
            unitClassName += " animated fadeOutUp";
        }
        return (
            <button className={className} onClick={this.props.onClick}>
                <span
                    ref="unit" 
                    className={unitClassName}
                >
                    {this.props.unit ? this.props.unit.icon : ""}
                </span>
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