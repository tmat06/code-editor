import React from "react";
import { connect } from "react-redux";

const componentNames = {
  VarKeyword: VarKeywordToken,
  VarName: VarNameToken,
  String: StringToken,
  Operator: OperatorToken
};

class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      lessonPart: {}
    };
  }

  componentDidMount() {
    const { part } = this.props.match.params;
    const lessonPart = { ...this.props.parts[part - 1] };
    this.setState({ lessonPart });
    //call to redux with proper part id
  }

  render() {
    console.log("lessonPart", this.state.lessonPart);
    const CurrentToken = componentNames[type];
    return (
      <div>
        CodeEditor {this.state.lessonPart.title}
        {this.state.lessonPart.desc}
        {this.state.lessonPart.tokens
          ? this.state.lessonPart.tokens.map((val, i) => {
              return (
                <CurrentToken value={"VarName"} test={false} prompt={"none"} />
              );
            })
          : ""}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    parts: state.parts
  };
}

export default connect(mapStateToProps)(CodeEditor);
