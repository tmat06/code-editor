import React from "react";

export default class Click extends React.Component {
  render() {
    return (
      <div style={this.props.styles}>
        Clickable: {this.props.value}: test: {JSON.stringify(this.props.test)}
      </div>
    );
  }
}
