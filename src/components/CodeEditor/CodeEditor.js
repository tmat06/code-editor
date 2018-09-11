import React from "react";
import { connect } from "react-redux";
import VarKeywordToken from "./../Token/tokens/VarKeywordToken";
import VarNameToken from "../Token/tokens/VarNameToken";
import OperatorToken from "./../Token/tokens/OperatorToken";
import StringToken from "./../Token/tokens/StringToken";
import { Button, Modal, Header } from "semantic-ui-react";
import { resetGridValues } from "./../../ducks/reducer";

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
      lessonPart: {},
      gridValues: [
        { num: 1011, name: "Var Name", value: "Undefined" },
        { num: 1012, name: "Var Name", value: "Undefined" },
        { num: 1013, name: "Var Name", value: "Undefined" },
        { num: 1014, name: "Var Name", value: "Undefined" },
        { num: 1015, name: "Var Name", value: "Undefined" },
        { num: 1016, name: "Var Name", value: "Undefined" },
        { num: 1017, name: "Var Name", value: "Undefined" },
        { num: 1018, name: "Var Name", value: "Undefined" },
        { num: 1019, name: "Var Name", value: "Undefined" }
      ]
    };
  }

  componentDidMount() {
    const { part } = this.props.match.params;
    if (this.props.parts) {
      const lessonPart = { ...this.props.parts[part - 1] };
      this.setState({ lessonPart });
    }
    this.props.resetGridValues();
    //call to redux with proper part id
  }

  render() {
    const { testMode, title, description, tokens } = this.state.lessonPart;
    return (
      <div className="code-editor-wrapper">
        <div className="card">
          {/* Display Modal here */}
          <div className="instructions">
            <h1>{title}</h1>
            <h3>{testMode}</h3>
            <p className="description">{description}</p>
          </div>
          {tokens
            ? tokens.map((val, i) => {
                const { id, type, test, prompt, value, connector } = val;

                const CurrentToken = componentNames[val.type];
                if (val.value === "hello") {
                  console.log("connector", connector);
                }
                return (
                  <div className="token">
                    <CurrentToken
                      key={id}
                      type={type}
                      value={value}
                      test={test}
                      prompt={prompt}
                      testMode={testMode}
                      connector={connector}
                    />
                  </div>
                );
              })
            : ""}
        </div>
        <section className="memory-grid">
          {this.state.gridValues.map((val, i) => {
            return (
              <div className="memory-location">
                <p>{val.num}</p>
                <p>
                  {this.props.gridValues[i]
                    ? this.props.gridValues[i].varName
                    : val.name}
                </p>
                <p className="value">
                  {this.props.gridValues[i]
                    ? this.props.gridValues[i].value
                    : val.value}
                </p>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    parts: state.parts,
    gridValues: state.gridValues
  };
}

export default connect(
  mapStateToProps,
  { resetGridValues }
)(CodeEditor);
