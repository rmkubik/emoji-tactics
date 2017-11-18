import React from 'react';
import PropTypes from 'prop-types';

export class Unit extends React.Component {
    render() {
        return (
                <span
                    className={"unit"}
                >
                    {this.props.unit ? this.props.unit.icon : ""}
                </span>
        )
    }
}