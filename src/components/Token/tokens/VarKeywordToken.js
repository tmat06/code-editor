import React from "react";
import Token from "../Token";
import FillIn from "./FillIn";
import Clickable from "./Clickable";

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
    const CLICKABLE = "Clickable";
    const { test, testMode, value, type, prompt, connector } = this.props;
    const boxStyle = {
      width: value && `${value.length}em`,
      borderColor: `#FD5FF1`,
      color: "white"
    };
    switch (testMode) {
      case FILL:
        return (
          <FillIn
            value={value}
            type={type}
            test={test}
            styles={boxStyle}
            connector={connector}
          />
        );
      case CLICKABLE:
        return (
          <Clickable
            value={value}
            prompt={prompt}
            type={type}
            test={test}
            styles={boxStyle}
            connector={connector}
          />
        );
      default:
        console.log("something went wrong");
    }
  }
}
