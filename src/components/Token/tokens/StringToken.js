import React from "react";
import Token from "../Token";

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
    const { input, display } = this.state;
    const boxStyle = {
      width: expected && `${expected.length}em`,
      borderColor: `#A6E22E`
    };
    return (
      // we have to bind the parent's function to our "this" context
      // there might be an easier way to do this with .bind (if the method
      // is going to be reused)
      <div
        className="token string"
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
