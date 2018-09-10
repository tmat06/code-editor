import React from "react";

export default class Clickable extends React.Component {
  constructor() {
    super();
    this.state = {
      correct: false,
      display: "",
      displayModal: ""
    };
  }

  componentDidMount() {
    if (!this.props.test) this.setState({ display: this.props.value });
  }

  validateToken(test) {
    if (test) {
      this.setState({ correct: true });
    } else {
      alert("Wrong Homie");
    }
  }

  render() {
    const { value, styles, type, test } = this.props;
    if (this.state.correct) {
      alert("Thats Correct! Task Complete");
    }
    switch (type) {
      case "VarKeyword":
        return (
          <div
            className="token var-keyword"
            onClick={() => this.validateToken(test)}
          >
            {value}
          </div>
        );
      case "VarName":
        return (
          <div
            className="token var-name"
            onClick={() => this.validateToken(test)}
          >
            {value}
          </div>
        );
      case "String":
        return (
          <div
            className="token string"
            onClick={() => this.validateToken(test)}
          >
            {value}
          </div>
        );
      case "Operator":
        return (
          <div
            className="token operator"
            onClick={() => this.validateToken(test)}
          >
            {value}
          </div>
        );
      default:
        return (
          <div style={this.props.styles}>
            Clickable: {this.props.value}: test:{" "}
            {JSON.stringify(this.props.test)}
            <input style={this.props.styles} />
          </div>
        );
    }
  }
}
