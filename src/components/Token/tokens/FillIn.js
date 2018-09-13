import React from "react";
import { updateGridValues } from "./../../../ducks/reducer";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class FillIn extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      display: "",
      wrong: false
    };
  }

  componentDidMount() {
    let { value, connector, type, test } = this.props;
    //If Token is not testable, allow it's value to be displayed and update on Grid via redux
    if (!test) {
      this.setState({ display: value });
      this.props.updateGridValues({ value, connector, type });
    }
  }

  testValidator(test) {
    if (test) {
      this.setState({ input: "" });
    }
  }

  validateToken = (input, connector, token, type) => {
    let { value } = this.props;
    //Converts user input into a Number if possible, else keeps to a String
    +input ? (input = +input) : (input = input);
    if (!input) {
      return;
    } else if (typeof input !== type) {
      //Triggers Error Animation
      this.setState({ wrong: true });
      setTimeout(() => {
        this.setState({ wrong: false });
      }, 2);
      toast.error("wrong input type");
    } else if (value && input && input !== value) {
      this.setState({ wrong: true });
      setTimeout(() => {
        this.setState({ wrong: false });
      }, 1000);
      toast.error(`Wrong value... we expected: ${value}`);
    } else {
      // all tests have passed, so we can update our display and redux;
      this.setState({ display: input });
      this.props.updateGridValues({ value: input, connector, type: token });
    }
  };

  render() {
    const { styles, type, test, connector } = this.props;
    const { input, display } = this.state;

    // Render based on the type of the Token
    switch (type) {
      case "VarKeyword":
        return (
          <div
            className="token var-keyword"
            onClick={() => this.testValidator(test)}
          >
            {display || (
              <input
                autoFocus
                onBlur={() =>
                  this.validateToken(input, connector, type, "string")
                }
                onKeyUp={e =>
                  e.keyCode === 13
                    ? this.validateToken(input, connector, type, "string")
                    : null
                }
                className={
                  this.state.wrong ? "input-box input-animation" : "input-box"
                }
                onChange={e =>
                  this.setState({ input: e.target.value, wrong: false })
                }
                style={styles}
              />
            )}
          </div>
        );
      case "VarName":
        return (
          <div
            className="token var-name"
            onClick={() => this.testValidator(test)}
          >
            {display || (
              <input
                autoFocus
                onBlur={() =>
                  this.validateToken(input, connector, type, "string")
                }
                onKeyUp={e =>
                  e.keyCode === 13
                    ? this.validateToken(input, connector, type, "string")
                    : null
                }
                defaultValue={input}
                className={
                  this.state.wrong ? "input-box input-animation" : "input-box"
                }
                onChange={e =>
                  this.setState({
                    input: e.target.value,
                    wrong: false
                  })
                }
                style={styles}
              />
            )}
          </div>
        );
      case "String":
        return (
          <div
            className="token string"
            onClick={() => this.testValidator(test)}
          >
            {display || (
              <input
                autoFocus
                onBlur={() =>
                  this.validateToken(input, connector, type, "string")
                }
                onKeyUp={e =>
                  e.keyCode === 13
                    ? this.validateToken(input, connector, type, "string")
                    : null
                }
                defaultValue={input}
                className={
                  this.state.wrong ? "input-box input-animation" : "input-box"
                }
                onChange={e =>
                  this.setState({
                    input: e.target.value,
                    wrong: false
                  })
                }
                style={styles}
              />
            )}
          </div>
        );
      case "Operator":
        return (
          <div
            className="token operator"
            onClick={() => this.testValidator(test)}
          >
            {display || (
              <input
                autoFocus
                onBlur={() =>
                  this.validateToken(input, connector, type, "string")
                }
                onKeyUp={e =>
                  e.keyCode === 13
                    ? this.validateToken(input, connector, type, "string")
                    : null
                }
                defaultValue={input}
                className={
                  this.state.wrong ? "input-box input-animation" : "input-box"
                }
                onChange={e =>
                  this.setState({ input: e.target.value, wrong: false })
                }
                style={styles}
              />
            )}
          </div>
        );
      default:
        return (
          <div style={this.props.styles}>
            FillIn: {this.props.value}: test: {JSON.stringify(this.props.test)}
            <input style={this.props.styles} />
          </div>
        );
    }
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  { updateGridValues }
)(FillIn);
