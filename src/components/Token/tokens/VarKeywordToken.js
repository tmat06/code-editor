import React from "react";
import Token from "../Token";
import FillIn from "./FillIn";
import Click from "./Clickable";

export default class VarKeywordToken extends Token {
  constructor() {
    super();
    this.state = {
      input: "",
      display: ""
    };
  }

  render() {
    const FILL = "Fill in";
    const CLICK = "Clickable";
    const { locked, defaultValue, test, testMode, value } = this.props;
    console.log("VarKeywordToken", this.props);
    const { input, display } = this.state;
    const boxStyle = {
      width: value && `${value.length}em`,
      borderColor: `#FD5FF1`,
      color: "white"
    };
    switch (testMode) {
      case FILL:
        return <FillIn value={value} test={test} styles={boxStyle} />;
      case CLICK:
        return <Click value={value} test={test} styles={boxStyle} />;
      default:
        console.log("something went wrong");
    }
  }
}

{
  /* <div
className="token var-keyword"
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
</div> */
}
