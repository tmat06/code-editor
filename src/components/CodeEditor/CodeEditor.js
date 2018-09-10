import React from "react";
import { connect } from "react-redux";
import VarKeywordToken from "./../Token/tokens/VarKeywordToken";
import VarNameToken from "../Token/tokens/VarNameToken";
import OperatorToken from "./../Token/tokens/OperatorToken";
import StringToken from "./../Token/tokens/StringToken";
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
      <div className="code-editor-wrapper">
        <div className="card">
          {/* Display Modal here */}
          <h1>{title}</h1>
          <p>{description}</p>
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
        <section className="memory-grid">
          <div className="memory-location">
            <p>1011</p>
            <p>Var Name</p>
            <p className="value">Value</p>
          </div>
          <div className="memory-location">
            <p>1012</p>
            <p>Var Name</p>
            <p className="value">Value</p>
          </div>
          <div className="memory-location">
            <p>1013</p>
            <p>Var Name</p>
            <p className="value">Value</p>
          </div>
          <div className="memory-location">
            <p>1014</p>
            <p>Var Name</p>
            <p className="value">Value</p>
          </div>
          <div className="memory-location">
            <p>1015</p>
            <p>Var Name</p>
            <p className="value">Value</p>
          </div>
          <div className="memory-location">
            <p>1016</p>
            <p>Var Name</p>
            <p className="value">Value</p>
          </div>
          <div className="memory-location">
            <p>1017</p>
            <p>Var Name</p>
            <p className="value">Value</p>
          </div>
          <div className="memory-location">
            <p>1018</p>
            <p>Var Name</p>
            <p className="value">Value</p>
          </div>
          <div className="memory-location">
            <p>1019</p>
            <p>Var Name</p>
            <p className="value">Value</p>
          </div>
        </section>
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
