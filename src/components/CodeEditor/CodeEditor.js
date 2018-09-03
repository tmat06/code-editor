import React from "react";
import { connect } from "react-redux";
import VarKeywordToken from "./../Token/tokens/VarKeywordToken";
import VarNameToken from "../Token/tokens/VarNameToken";
import OperatorToken from "./../Token/tokens/OperatorToken";
import StringToken from "./../Token/tokens/StringToken";

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
    if (this.props.parts) {
      const lessonPart = { ...this.props.parts[part - 1] };
      this.setState({ lessonPart });
    }
    //call to redux with proper part id
  }

  render() {
    console.log("lessonPart", this.state.lessonPart);
    // const CurrentToken = componentNames[type];
    const { testMode, id, type, test, prompt } = this.state.lessonPart;
    return (
      <div>
        CodeEditor {this.state.lessonPart.title}
        {this.state.lessonPart.desciption}
        {this.state.lessonPart.tokens
          ? this.state.lessonPart.tokens.map((val, i) => {
              const CurrentToken = componentNames[val.type];
              return (
                <CurrentToken
                  key={id}
                  value={type}
                  test={test}
                  prompt={prompt}
                  testMode={testMode}
                />
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
