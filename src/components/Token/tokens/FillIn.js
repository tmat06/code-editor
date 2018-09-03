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

  validateToken = (input, value, type) => {
    if (!input) {
      return;
    } else if (typeof input !== type) {
      // return alert('Use the right data type... you used ${typeof input}');
      return false;
    } else if (value && input && input !== value) {
      //return alert(`Wrong value... we expected: ${expected}');
      return false;
    }
    // all tests have passed, so we can update our display;
    this.setState({ display: input });
    return true;
  };

  render() {
    const { value, styles, type } = this.props;
    const { input, display } = this.state;
    switch (type) {
      case "VarKeyword":
        return (
          <div
            className="token var-keyword"
            onClick={() => this.setState({ display: "" })}
          >
            {display || (
              <input
                autoFocus
                onBlur={this.validateToken(input, value, "string")}
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
      case "VarName":
        return (
          <div
            className="token var-name"
            onClick={() => this.setState({ display: "" })}
          >
            {
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
            }
          </div>
        );
      case "String":
        return (
          <div
            className="token string"
            onClick={() => this.setState({ display: "" })}
          >
            {display || (
              <input
                autoFocus
                onBlur={this.validateToken(input, value, "string")}
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
      case "Operator":
        return (
          <div
            className="token operator"
            onClick={() => this.setState({ display: "" })}
          >
            {display || (
              <input
                autoFocus
                onBlur={this.validateToken(input, value, "string")}
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
