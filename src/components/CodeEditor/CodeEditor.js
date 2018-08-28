import React from "react";
import { connect } from "react-redux";

class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { lessons } = this.props;
    //call to database would be sent here to retrieve the correct information
  }

  render() {
    return <div>CodeEditor</div>;
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(CodeEditor);
