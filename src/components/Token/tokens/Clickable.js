import React from "react";
import { updateGridValues, toggleAnswer } from "./../../../ducks/reducer";
import { connect } from "react-redux";
import { toast } from "react-toastify";

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
    //Updates Grid
    this.props.updateGridValues({ value, connector, type });
    //Toggles Blur of Grid upon Mounting
    if (this.props.correct) this.props.toggleAnswer();
  }

  componentWillUnmount() {
    //Removes Blur of Grid upon Dismount
    if (!this.props.correct) this.props.toggleAnswer();
  }

  validateToken(test) {
    if (test && !this.state.correct) {
      toast.success("Thats Correct! Task Complete");
      this.setState({ correct: true });
      //Removes Blur
      this.props.toggleAnswer();
    } else if (test && this.state.correct) {
      toast.success("You already got it correct");
    } else {
      toast.error("Wrong Homie");
    }
  }

  render() {
    const { value, type, test } = this.props;

    // Render based on the type of the Token
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
