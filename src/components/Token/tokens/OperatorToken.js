import React from "react";
import Token from "../Token";
import Clickable from "./Clickable";
import FillIn from "./FillIn";

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
    const FILL = "Fill in";
    const CLICKABLE = "Clickable";
    const { test, testMode, value, type, prompt } = this.props;
    const boxStyle = {
      width: value && `${value.length}em`,
      borderColor: `#E6DB74`
    };
    switch (testMode) {
      case FILL:
        return (
          <FillIn value={value} type={type} test={test} styles={boxStyle} />
        );
      case CLICKABLE:
        return (
          <Clickable
            value={value}
            type={type}
            test={test}
            styles={boxStyle}
            prompt={prompt}
          />
        );
      default:
        console.log("something went wrong");
        break;
    }
  }
}
