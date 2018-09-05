import React from "react";
import { connect } from "react-redux";
import VarKeywordToken from "./../Token/tokens/VarKeywordToken";
import VarNameToken from "../Token/tokens/VarNameToken";
import OperatorToken from "./../Token/tokens/OperatorToken";
import StringToken from "./../Token/tokens/StringToken";
import "./CodeEditor.css";
import { Button, Modal, Header } from "semantic-ui-react";

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
    const { testMode, title, description } = this.state.lessonPart;
    console.log(this.state.lessonPart);
    return (
      <div>
        {/* Display Modal here */}
        {title}
        {description}
        {this.state.lessonPart.tokens
          ? this.state.lessonPart.tokens.map((val, i) => {
              const { id, type, test, prompt, value } = val;
              const CurrentToken = componentNames[val.type];
              return (
                <div>
                  <CurrentToken
                    key={id}
                    type={type}
                    value={value}
                    test={test}
                    prompt={prompt}
                    testMode={testMode}
                  />
                </div>
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
