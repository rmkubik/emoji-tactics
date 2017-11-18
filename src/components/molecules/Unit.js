import React from 'react';
import PropTypes from 'prop-types';

export class Unit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unitClassName: ""
        };
    }

    // componentWillLeave() {
    //     this.setState({unitClassName: " animated bounce"});
    // }

    render() {
        return (
                <span
                    className={"unit" + this.state.unitClassName}
                >
                    {this.props.unit ? this.props.unit.icon : ""}
                </span>
        )
    }
}

Unit.propTypes = {
    unit: PropTypes.object
}