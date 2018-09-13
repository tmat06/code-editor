import React from "react";
import FillIn from "./FillIn";
import Clickable from "./Clickable";

export default class StringToken extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const FILL = "Fill in";
    const CLICKABLE = "Clickable";
    const { test, testMode, value, type, prompt, connector } = this.props;
    const boxStyle = {
      width: value && `${value.length}em`,
      borderColor: `#A6E22E`
    };
    //Will render correct Test Mode based on Prop
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
            type={type}
            test={test}
            styles={boxStyle}
            prompt={prompt}
            connector={connector}
          />
        );
      default:
        console.log("something went wrong");
        break;
    }
  }
}
