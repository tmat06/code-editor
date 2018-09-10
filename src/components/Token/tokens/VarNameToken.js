import React from "react";
import Token from "../Token";
import FillIn from "./FillIn";
import Clickable from "./Clickable";

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
    const CLICKABLE = "Clickable";
    console.log(this.props);
    const {
      value,
      test,
      testMode,
      type,
      prompt,
      title,
      description
    } = this.props;
    const boxStyle = {
      width: value && `${value.length}em`,
      borderColor: "#89BDFF",
      transform: "translateX(0px)",
      color: "white"
    };
    console.log(value, test, testMode);
    switch (testMode) {
      case FILL:
        return (
          <FillIn
            title={title}
            description={description}
            value={value}
            type={type}
            test={test}
            styles={boxStyle}
          />
        );
      case CLICKABLE:
        return (
          <Clickable
            prompt={prompt}
            value={value}
            type={type}
            test={test}
            styles={boxStyle}
          />
        );
      default:
        console.log("something went wrong");
        break;
    }
  }
}

// value={"VarName"} test={false} prompt={"none"}
