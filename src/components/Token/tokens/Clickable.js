import React from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { updateGridValues, toggleAnswer } from "./../../../ducks/reducer";

class Clickable extends React.Component {
  constructor() {
    super();
    this.state = {
      correct: false,
      display: "",
      displayModal: ""
    };
  }

  componentDidMount() {
    let { value, connector, type, test } = this.props;
    if (!test) this.setState({ display: this.props.value });
    this.props.updateGridValues({ value, connector, type });
    if (this.props.correct) this.props.toggleAnswer();
  }

  validateToken(test) {
    if (test && !this.state.correct) {
      this.setState({ correct: true });
      this.props.toggleAnswer();
    } else if (test && this.state.correct) {
      toast.success("You already got it correct");
    } else {
      toast.error("Wrong Homie");
    }
  }

  componentWillUnmount() {
    if (!this.props.correct) this.props.toggleAnswer();
  }

  render() {
    const { value, styles, type, test } = this.props;
    if (this.state.correct) {
      toast.success("Thats Correct! Task Complete");
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

function mapStateToProps(state) {
  return {
    correct: state.correct
  };
}

export default connect(
  mapStateToProps,
  { updateGridValues, toggleAnswer }
)(Clickable);
