import React from "react";

export default class FillIn extends React.Component {
  render() {
    return (
      <div style={this.props.styles}>
        FillIn: {this.props.value}: test: {JSON.stringify(this.props.test)}
      </div>
    );
  }
}
