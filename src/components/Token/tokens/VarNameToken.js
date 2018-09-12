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
    const {
      value,
      test,
      testMode,
      type,
      prompt,
      title,
      description,
      connector
    } = this.props;
    const boxStyle = {
      width: value && `${value.length}em`,
      borderColor: "#89BDFF",
      color: "white"
    };
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
            connector={connector}
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
