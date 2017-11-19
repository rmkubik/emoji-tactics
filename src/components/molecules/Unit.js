import React from 'react';
import PropTypes from 'prop-types';

export function Unit(props) {
    let healthClasses = {
        background: "unit-health-background",
        text: "unit-health"
    }
    switch (props.unit.owner.id) {
        case 0:
            healthClasses.background += " unit-health-background-team1";
            healthClasses.text += " unit-health-team1";
            break;
        case 1:
            healthClasses.background += " unit-health-background-team2";
            healthClasses.text += " unit-health-team2";
            break;
        default:
            console.warn("invalid team: " + props.unit.owner);
            break;
    }
    return (
        <div>
            <span className="unit">
                {props.unit ? props.unit.icon : ""}
            </span>
            <div className={healthClasses.background}>
                <span className={healthClasses.text}>
                    {props.unit.health > 0 ? props.unit.health : ""}
                </span>
            </div>
        </div>
    )
}