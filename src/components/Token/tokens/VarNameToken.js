import React from "react";
import Token from "../Token";
import FillIn from "./FillIn";
import Click from "./Clickable";

export default class VarNameToken extends Token {
  constructor() {
    super();
    this.state = {
      input: "",
      display: ""
    };
  }

  handleBlur(input, expected, dataType) {
    let correct = this.validateToken.call(this, input, expected, dataType);
    if (correct) this.setState({ wrong: false });
  }

  render() {
    const FILL = "Fill in";
    const CLICK = "Clickable";
    const { prompt, value, test, testMode } = this.props;
    console.log("VarNameToken", this.props);
    const { input, display } = this.state;
    const boxStyle = {
      width: value && `${value.length}em`,
      borderColor: "#89BDFF",
      transform: "translateX(0px)",
      color: "white"
    };
    console.log(value, test, testMode);
    switch (testMode) {
      case FILL:
        return <FillIn value={value} test={test} styles={boxStyle} />;
      case CLICK:
        return <Click value={value} test={test} styles={boxStyle} />;
      default:
        console.log("something went wrong");
        break;
    }
  }
}

// value={"VarName"} test={false} prompt={"none"}

/* <div
className="token var-name"
onClick={() => this.setState({ display: "" })}
>
{
  <input
    autoFocus
    onBlur={() => this.handleBlur(input, value, "string")}
    onKeyUp={e =>
      e.keyCode === 13 ? this.handleBlur(input, value, "string") : null
    }
    defaultValue={value}
    className="input-box"
    onChange={e => this.setState({ input: e.target.value })}
    style={{
      width: value && `${value.length}em`,
      borderColor: "#89BDFF",
      color: "white"
    }}
  />
}
</div> */
