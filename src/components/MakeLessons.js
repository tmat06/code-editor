import React, { Component } from "react";
import axios from "axios";

export default class MakeLessons extends Component {
  constructor() {
    super();
    this.state = {
      tokens: [],
      lesson: "",
      testMode: "",
      order: "",
      tokenType: "",
      value: "",
      testable: false,
      connector: "",
      num: 0
    };
  }


  addToken() {
    var { order, tokenType, value, testable, connector, num } = this.state;
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
        testable !== "" &&
        connector === "undefined") ||
      typeof connector === "string"
    ) {
      var temp = [...this.state.tokens];
      temp.push({ order, tokenType, value, testable, connector });
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
        testable: false,
        connector: ""
      });
    } else {
      alert("You should save this token first");
    }
  }

  submit() {
    var {
      lesson,
      testMode,
      tokens,
      num
    } = this.state;
    this.reset();
    if (
      lesson &&
      typeof lesson === "number" &&
      testMode &&
      tokens.length === num
    ) {
      var sending = { lesson, testMode, tokens };
      this.setState = { lesson: "", testMode: "", tokens: [], order: "" };
      axios.post("/api/newQuiz", { sending }).then(res => {
          alert("Sumbitted!")
      });
    } else {
      alert(
        "Oops. Looks like the lesson or test mode is wrong, or you don't have any tokens..."
      );
    }
  }

  render() {
    return (
      <div>
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
          onClick={() => this.setState({ testMode: "Fill-In" })}
        >
          Fill in
        </button>

        <h1>Tokens:</h1>
        <h3>Order: (example: var would be 1)</h3>
        <input
          style={{ color: "black" }}
          onChange={e =>
            this.setState({
              order: +e.target.value ? +e.target.value : e.target.value
            })
          }
          value={this.state.order}
        />
        <h3>Token Type: (types: VarKeyword, VarName, Operator, String)</h3>
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
        <p>{this.state.testable ? "true" : "false"}</p>
        <button
          className="button"
          onClick={() => this.setState({ testable: true })}
        >
          True
        </button>
        <button
          className="button"
          onClick={() => this.setState({ testable: false })}
        >
          False
        </button>
        <h3>Connected token value? (If none, select undefined)</h3>
        <h3>
          If connected token type is string, please insert it with quotes around
          it
        </h3>
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
        <div>
          <p>{this.state.lesson}</p>
          <p>{this.state.testMode}</p>
          <div>
            {this.state.tokens.map(token => {
              return (
                <div>
                  <p>{token.order}</p>
                  <p>{token.tokenType}</p>
                  <p>{token.value}</p>
                  <p>{token.testable}</p>
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
