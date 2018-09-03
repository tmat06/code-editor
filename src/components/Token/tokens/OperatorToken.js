import React from "react";
import Token from "../Token";

// we could use a list of valid inputs to test what they give us
const validOperators = ["+", "-", "*", "/"];

export default class StringToken extends Token {
  constructor() {
    super();
    this.state = {
      input: "",
      display: ""
    };
  }

  render() {
    const { defaultValue, locked, expected } = this.props;
    const { display, input } = this.state;
    const boxStyle = {
      width: expected && `${expected.length}em`,
      borderColor: `#E6DB74`
    };
    return (
      <div
        className="token operator"
        onClick={() => this.setState({ display: "" })}
      >
        {display ||
          defaultValue || (
            <input
              autoFocus
              onBlur={this.validateToken.bind(this, input, expected, "string")}
              onKeyUp={e =>
                e.keyCode === 13
                  ? this.validateToken.call(this, input, expected, "string")
                  : null
              }
              defaultValue={input}
              className="input-box"
              onChange={e => this.setState({ input: e.target.value })}
              style={boxStyle}
            />
          )}
      </div>
    );
  }
}
