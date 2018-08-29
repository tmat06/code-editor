import React from "react";

export default class VarNameToken extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div
        className="token var-name"
        onClick={() => this.setState({ display: "" })}
      >
        {display ||
          defaultValue || <input onBlur={() => this.handleBlur(input)} />}
      </div>
    );
  }
}

// value={"VarName"} test={false} prompt={"none"}
