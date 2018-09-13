import React from "react";
import axios from "axios";
//Redux
import { resetGridValues, updateLesson } from "./../../ducks/reducer";
import { connect } from "react-redux";
//Token Templates
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
      lessonPart: {},
      // gridValues should never be modified, changes will be shown in the Testing Components(Clickable, FillIn, etc...) via redux
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
    const { lesson, part } = this.props.match.params;

    //resets any previous redux changes for the grid
    this.props.resetGridValues();

    // part === 0 indicates that we're in quiz mode
    if (part === "0") {
      //will retrieve quiz questions from db
      console.log(`need quiz questions for lesson ${lesson}`);
      // axios.get(`/api/quiz/${lesson}`).then(results => {});
    }

    //checks if redux has any lessons on it
    else if (this.props.parts[0]) {
      //will update current lesson based on which part is in the match.params
      const lessonPart = { ...this.props.parts[part - 1] };
      this.setState({ lessonPart });
    } else {
      //if no lesson on redux, axios call will be made to place the correct lesson on redux
      axios.get(`/api/parts/${lesson}`).then(results => {
        this.props.updateLesson(results.data);
        const lessonPart = { ...this.props.parts[part - 1] };
        this.setState({ lessonPart });
      });
    }
  }

  render() {
    const { testMode, title, description, tokens } = this.state.lessonPart;
    return (
      <div className="code-editor-wrapper">
        <div className="card">
          <div className="instructions">
            <h1>{title}</h1>
            <h3>{testMode}</h3>
            <p className="description">{description}</p>
          </div>
          {tokens
            ? tokens.map((val, i) => {
                const { id, type, test, prompt, value, connector } = val;
                //CurrentToken will render the correct Token based on the type that's passed to it
                const CurrentToken = componentNames[val.type];
                return (
                  <div className="token" key={id}>
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
        {/* The Grid  \/ */}
        <section className="memory-grid">
          {this.state.gridValues.map((val, i) => {
            return (
              <div className="memory-location" key={i}>
                <p
                  //To blur the values based on if the testMode is Clickable
                  style={
                    //this.props.correct is updated on redux once the answer is correct on the Clickable component
                    this.props.correct
                      ? {}
                      : {
                          color: "transparent",
                          textShadow: "0 0 5px rgba(250,250,250,250.5)"
                        }
                  }
                >
                  {val.num}
                </p>
                <p
                  style={
                    this.props.correct
                      ? {}
                      : {
                          color: "transparent",
                          textShadow: "0 0 15px rgba(250,250,250,250.5)"
                        }
                  }
                >
                  {this.props.gridValues[i]
                    ? this.props.gridValues[i].varName
                    : val.name}
                </p>
                <p
                  className="value"
                  style={
                    this.props.correct
                      ? {}
                      : {
                          color: "transparent",
                          textShadow: "0 0 15px rgba(250,250,250,250.5)"
                        }
                  }
                >
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
    gridValues: state.gridValues,
    correct: state.correct
  };
}

export default connect(
  mapStateToProps,
  { resetGridValues, updateLesson }
)(CodeEditor);
