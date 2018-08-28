import React from "react";

export default class Token extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  validateToken = (input, value, type) => {
    if (!input) {
      return;
    } else if (typeof input !== type) {
      // return alert('Use the right data type... you used ${typeof input}');
      return false;
    } else if (value && input && input !== expected) {
      //return alert(`Wrong value... we expected: ${expected}');
      return false;
    }
    // all tests have passed, so we can update our display;
    this.setState({ display: input });
    return true;
  };
}
