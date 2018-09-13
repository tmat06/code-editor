import React from "react";
import FillIn from "./FillIn";
import Clickable from "./Clickable";

export default class VarNameToken extends React.Component {
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
    //Will render correct Test Mode based on Prop
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
