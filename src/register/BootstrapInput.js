import React, { Component } from "react";

class BootstrapInput extends Component {

    render() {
        return (
            <input type="text"
                id={this.props.id}
                value={this.props.val}
                onChange={this.props.handler}
                className="form-control register__form"
                placeholder={this.props.placeholder} />

        );
    }
}

export default BootstrapInput;