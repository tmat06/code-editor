import React from "react";
import axios from "axios";
import swal from "sweetalert2";
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
      num: 0,
      getQuiz: true,
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
      this.setState({ num: 1, getQuiz: false });
      //will retrieve quiz questions from db
      axios.get(`/api/quiz/${lesson}`).then(results => {
        this.props.updateLesson(results.data);
        this.setState({ lessonPart: results.data[+part] });
      });
    }
    //checks if redux has any lessons on it
    else if (this.props.parts[0]) {
      //will update current lesson based on which part is in the match.params
      const lessonPart = { ...this.props.parts[+part - 1] };
      this.setState({ lessonPart });
    } else {
      //if no lesson on redux, axios call will be made to place the correct lesson on redux
      axios.get(`/api/parts/${lesson}`).then(results => {
        this.props.updateLesson(results.data);
        const lessonPart = { ...this.props.parts[+part - 1] };
        this.setState({ lessonPart });
      });
    }
  }


  // It doesnt re-render with the next button, so this makes it rerender
  componentDidUpdate(prevProps) {
    var { part, lesson } = this.props.match.params;
    if (
      part !== prevProps.match.params.part ||
      lesson !== prevProps.match.params.lesson
    ) {
      this.props.resetGridValues();
      // part === 0 indicates that we're in quiz mode
      if (part === "0") {
        // getQuiz on state tells it if it needs to get the quiz problems or not
        if (this.state.getQuiz) {
          axios.get(`/api/quiz/${lesson}`).then(results => {
            // update the lessons on redux with the quiz questions
            this.props.updateLesson(results.data);
            // Set the lesson part to the first quiz in the array, set the number to 1, so we can use that as the index, make sure we don't go get more quiz questions by flipping the getQuiz to false
            this.setState({
              lessonPart: results.data[+part],
              num: 1,
              getQuiz: false
            });
          });
        } 
      }
      //checks if redux has any lessons on it
      else if (this.props.parts[0]) {
        //will update current lesson based on which part is in the match.params
        this.setState({ lessonPart: this.props.parts[+part - 1] });
      } else {
        //if no lesson on redux, axios call will be made to place the correct lesson on redux
        axios.get(`/api/parts/${lesson}`).then(results => {
          this.props.updateLesson(results.data);
          const lessonPart = { ...this.props.parts[+part - 1] };
          this.setState({ lessonPart, getQuiz: true });
        });
      }
    }
  }

  // This runs when they press the next button
  next() {
    var { part, lesson } = this.props.match.params;
    // Checks if we're in quiz mode
    if (part === "0") {
      // Are there any more quiz questions? If yes, set the next one to state, and increment the index, make sure to reset the grid values for the next question
      if (this.props.parts[this.state.num]) {
        this.setState({
          lessonPart: this.props.parts[this.state.num],
          num: this.state.num + 1
        });
        this.props.resetGridValues();
        // If there are no more questions, have a sweetalert. If they want to move on, it pushes them to the next lesson. It sets the lessons on redux to nothing, and pushes you to the url for the next lesson
      } else {
        swal({
          type: "success",
          title: "Yay!",
          text:
            "You finished the quiz! Would you like to continue to the next lesson?",
          showConfirmButton: true,
          showCancelButton: true
        }).then(result => {
          if (result.value) {
            this.props.updateLesson([]);
            this.props.history.push(`/${+lesson + 1}/1`);
          }
        });
      }
      // If they're on a lesson
    } else {
      // Is there another part in this lesson?
      if (this.props.parts[+part]) {
        // if yes, push them to the next lesson url and update the lesson part of redux
        this.setState({ lessonPart: this.props.parts[+part] });
        this.props.history.push(`/${+lesson}/${+part + 1}`);
        // If that was the last part in the lesson, sweetalert, if they want to continue, reset the lesson, and push them to the quiz for that lesson
      } else {
        swal({
          type: "success",
          title: "Yay!",
          text:
            "You finished the Lesson! Would you like to continue to the quiz?",
          showConfirmButton: true,
          showCancelButton: true
        }).then(result => {
          if (result.value) {
            this.props.updateLesson([]);
            this.props.history.push(`/${+lesson}/0`);
          }
        });
      }
    }
  }

  render() {
    console.log(this.state)
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
          <button className="button" onClick={() => this.next()}>
            Next Question
          </button>
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
