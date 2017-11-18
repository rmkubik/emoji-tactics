import React from 'react';
import PropTypes from 'prop-types';

export function Unit(props) {
    return (
        <span
            className={"unit"}
        >
            {props.unit ? props.unit.icon : ""}
        </span>
    )
}