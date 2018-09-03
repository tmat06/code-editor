import React from "react";
import Token from "../Token";
import FillIn from "./FillIn";
import Clickable from "./Clickable";

export default class StringToken extends Token {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const FILL = "Fill in";
    const CLICKABLE = "Clickable";
    const { test, testMode, value } = this.props;
    const boxStyle = {
      width: value && `${value.length}em`,
      borderColor: `#A6E22E`
    };

    switch (testMode) {
      case FILL:
        return <FillIn value={value} test={test} styles={boxStyle} />;
      case CLICKABLE:
        return <Clickable value={value} test={test} styles={boxStyle} />;
      default:
        console.log("something went wrong");
        break;
    }
  }
}
