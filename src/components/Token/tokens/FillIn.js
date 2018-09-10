import React from "react";

export default class FillIn extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      display: ""
    };
  }

  componentDidMount() {
    if (!this.props.test) this.setState({ display: this.props.value });
  }

  testValidator(test) {
    if (test) {
      this.setState({ input: "" });
    }
  }

  validateToken = (input, value, type) => {
    //Needs Work
    +input ? (input = +input) : (input = input);
    if (!input) {
      return;
    } else if (typeof input !== type) {
      return console.log("wrong input type");
    } else if (value && input && input !== value) {
      return console.log(`Wrong value... we expected: ${value}`);
    }
    // all tests have passed, so we can update our display;
    this.setState({ display: input });
  };

  render() {
    const { value, styles, type, test } = this.props;
    const { input, display } = this.state;
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
                onBlur={() => this.validateToken(input, value, "string")}
                onKeyUp={e =>
                  e.keyCode === 13
                    ? this.validateToken(input, value, "string")
                    : null
                }
                className="input-box"
                onChange={e => this.setState({ input: e.target.value })}
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
                onBlur={() => this.validateToken(input, value, "string")}
                onKeyUp={e =>
                  e.keyCode === 13
                    ? this.validateToken(input, value, "string")
                    : null
                }
                defaultValue={input}
                className="input-box"
                onChange={e => this.setState({ input: e.target.value })}
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
                onBlur={() => this.validateToken(input, value, "string")}
                onKeyUp={e =>
                  e.keyCode === 13
                    ? this.validateToken(input, value, "string")
                    : null
                }
                defaultValue={value}
                className="input-box"
                onChange={e => this.setState({ input: e.target.value })}
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
                onBlur={() => this.validateToken(input, value, "string")}
                onKeyUp={e =>
                  e.keyCode === 13
                    ? this.validateToken(input, value, "string")
                    : null
                }
                defaultValue={input}
                className="input-box"
                onChange={e => this.setState({ input: e.target.value })}
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
