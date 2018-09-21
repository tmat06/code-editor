import React, { Component } from "react";
import axios from "axios";

// This is a form to help you easily put quizzes into the database. This page can look a little confusing, but just fill in the form. If there is a bad input, it will tell you. And I tried to put good instructions on the form. When you're done creating the token, press the submit token button, and then if you need to do another token for that lesson part, click new token. When you're all done, click submit token and then submit quiz. It'll give you a success message and then you can do another one.


export default class MakeLessons extends Component {
  constructor() {
    super();
    this.state = {
      tokens: [],
      lesson: "",
      testMode: "",
      description: "",
      order: "",
      tokenType: "",
      value: "",
      test: false,
      connector: "",
      num: 0
    };
  }

  addToken() {
    var { order, tokenType, value, test, connector, num } = this.state;
    var tokens = {
      VarName: "VarName",
      VarKeyword: "VarKeyword",
      String: "String",
      Operator: "Operator"
    };
    if (
      (order &&
        typeof order === "number" &&
        tokens[tokenType] &&
        value &&
        test !== "" &&
        connector === "undefined") ||
      typeof connector === "string"
    ) {
      var temp = [...this.state.tokens];
      temp.push({ order, tokenType, value, test, connector });
      this.setState({ tokens: [...temp], num: ++num });
    } else {
      alert("Uh-oh. Something in the tokens part doesn't look right...");
    }
  }

  reset() {
    var { num, tokens } = this.state;
    if (tokens.length === num) {
      this.setState({
        order: this.state.order + 1,
        tokenType: "",
        value: "",
        test: false,
        connector: ""
      });
    } else {
      alert("You should save this token first");
    }
  }

  submit() {
    var { lesson, testMode, tokens, num, description } = this.state;
    this.reset();
    if (
      lesson &&
      typeof lesson === "number" &&
      testMode &&
      tokens.length === num &&
      description
    ) {
      var sending = { lesson, testMode, description, tokens };
      axios.post("/api/newQuiz", { sending }).then(res => {
        console.log("It worked")
        alert("Sumbitted!");
        this.setState ({
          lesson: "",
          testMode: "",
          tokens: [],
          order: "",
          description: "",
          num: 0
        });
      });
    } else {
      alert(
        "Oops. Looks like the lesson or test mode is wrong, or you don't have any tokens..."
      );
    }
  }

  render() {
    return (
      <div style={{display: "flex"}}>
        <div style={{marginRight: "40px", marginLeft: "20px"}}>
          <h1>Which Lesson is the quiz for?</h1>
          <input
            style={{ color: "black" }}
            onChange={e =>
              this.setState({
                lesson: +e.target.value ? +e.target.value : e.target.value
              })
            }
            value={this.state.lesson}
          />
          <h1>Which test mode?</h1>
          <h3>{this.state.testMode}</h3>
          <button
            className="button"
            onClick={() => this.setState({ testMode: "Clickable" })}
          >
            Clickable
          </button>
          <button
            className="button"
            onClick={() => this.setState({ testMode: "Fill in" })}
          >
            Fill in
          </button>
          <h1>Quiz Instructions:</h1>
          <input
            style={{ color: "black" }}
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
          <h1>Tokens:</h1>
          <h3>Order: </h3>
          <p>(example: var would be 1)</p>
          <input
            style={{ color: "black" }}
            onChange={e =>
              this.setState({
                order: +e.target.value ? +e.target.value : e.target.value
              })
            }
            value={this.state.order}
          />
          <h3>Token Type: </h3>
          <h4>(types: VarKeyword, VarName, Operator, String)</h4>
          <input
            style={{ color: "black" }}
            onChange={e => this.setState({ tokenType: e.target.value })}
            value={this.state.tokenType}
          />
          <h3>Value: </h3>
          <p>(example: if you want it to say var, type var)</p>
          <p>If token type is string, please insert it with quotes around it</p>
          <input
            style={{ color: "black" }}
            onChange={e => this.setState({ value: e.target.value })}
            value={this.state.value}
          />
          <h3>Testable?</h3>
          <p>{this.state.test ? "true" : "false"}</p>
          <button
            className="button"
            onClick={() => this.setState({ test: true })}
          >
            True
          </button>
          <button
            className="button"
            onClick={() => this.setState({ test: false })}
          >
            False
          </button>
          <h3>Connected token value? </h3>
          <p>(If none, select undefined)</p>
          <p>
            If connected token type is string, please insert it with quotes
            around it
          </p>
          <input
            style={{ color: "black" }}
            onChange={e => this.setState({ connector: e.target.value })}
            value={this.state.connector}
          />
          <button
            className="button"
            onClick={() => this.setState({ connector: "undefined" })}
          >
            Undefined
          </button>
          <br />
          <button className="button" onClick={() => this.addToken()}>
            Submit Token
          </button>
          <button className="button" onClick={() => this.reset()}>
            New Token
          </button>
          <button className="button" onClick={() => this.submit()}>
            Submit Quiz
          </button>
          </div>
          <div>
            <p>{this.state.lesson}</p>
            <p>{this.state.testMode}</p>
            <p>{this.state.description}</p>
            <div>
              {this.state.tokens.map(token => {
                return (
                  <div>
                    <p>{token.order}</p>
                    <p>{token.tokenType}</p>
                    <p>{token.value}</p>
                    <p>{token.test}</p>
                    <p>{token.connector}</p>
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
      </div>
    );
  }
}
