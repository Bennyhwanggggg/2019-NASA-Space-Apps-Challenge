import React from 'react';

class Button extends React.Component {

    constructor(props) {
        super(props);
        this.label = this.props.label != null ? this.props.label : '';
        this.className = this.props.className != null ? this.props.className : 'button';
        this.style = this.props.style;
        this.onClickFunction = this.props.onClickFunction;
    }

    render() {
        return (
            <button
                className={this.className}
                style={this.style}
                onClick={() => this.onClickFunction}
            >
                {this.label}
            </button>
        )
    }
}

export default Button;