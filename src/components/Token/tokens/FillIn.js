import React from "react";
import { connect } from "react-redux";
import { updateGridValues } from "./../../../ducks/reducer";
import { toast } from "react-toastify";
import { Motion, spring, presets } from "react-motion";

class FillIn extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      display: "",
      error: false
    };
  }

  componentDidMount() {
    let { value, connector, type, test } = this.props;
    if (!this.props.test) this.setState({ display: this.props.value });
    if (!test) this.props.updateGridValues({ value, connector, type });
  }

  testValidator(test) {
    if (test) {
      this.setState({ input: "" });
    }
  }

  validateToken = (input, connector, token, type) => {
    let { value } = this.props;
    //Needs Work
    +input ? (input = +input) : (input = input);
    if (!input) {
      return;
    } else if (typeof input !== type) {
      this.setState({ error: !this.state.error }, () => {
        setTimeout(() => {
          this.setState({ error: !this.state.error });
        }, 1000);
      });
      toast.error("wrong input type");
    } else if (value && input && input !== value) {
      this.setState({ error: !this.state.error }, () => {
        setTimeout(() => {
          this.setState({ error: !this.state.error });
        }, 1000);
      });
      toast.error(`Wrong value... we expected: ${value}`);
    } else {
      // all tests have passed, so we can update our display;
      this.setState({ display: input });

      // need the varname and the value passed here
      console.log(input, connector, token);
      this.props.updateGridValues({ value: input, connector, type: token });
    }
  };

  render() {
    const { styles, type, test, connector } = this.props;
    const { input, display } = this.state;

    switch (type) {
      case "VarKeyword":
        return (
          <div
            className="token var-keyword"
            onClick={() => this.testValidator(test)}
          >
            {display || (
              <input
                autoFocus
                onBlur={() =>
                  this.validateToken(input, connector, type, "string")
                }
                onKeyUp={e =>
                  e.keyCode === 13
                    ? this.validateToken(input, connector, type, "string")
                    : null
                }
                className="input-box"
                onChange={e => this.setState({ input: e.target.value })}
                style={styles}
              />
            )}
          </div>
        );
      case "VarName":
        return (
          <Motion
            defaultStyle={{ x: 0 }}
            style={{
              x: this.state.error
                ? spring(20, presets.wobbly)
                : spring(0, presets.wobbly)
            }}
          >
            {mot => {
              return (
                <div
                  className="token var-name"
                  onClick={() => this.testValidator(test)}
                >
                  {display || (
                    <input
                      autoFocus
                      onBlur={() =>
                        this.validateToken(input, connector, type, "string")
                      }
                      onKeyUp={e =>
                        e.keyCode === 13
                          ? this.validateToken(input, connector, type, "string")
                          : null
                      }
                      defaultValue={input}
                      className="input-box"
                      onChange={e =>
                        this.setState({
                          input: e.target.value,
                          varName: e.target.value
                        })
                      }
                      style={
                        this.state.error
                          ? {
                              width:
                                this.props.value &&
                                `${this.props.value.length}em`,
                              borderColor: "red",
                              transform: `translateX(${mot.x}px)`,
                              color: "red"
                            }
                          : styles
                      }
                    />
                  )}
                </div>
              );
            }}
          </Motion>
        );
      case "String":
        return (
          <div
            className="token string"
            onClick={() => this.testValidator(test)}
          >
            {display || (
              <input
                autoFocus
                onBlur={() =>
                  this.validateToken(input, connector, type, "string")
                }
                onKeyUp={e =>
                  e.keyCode === 13
                    ? this.validateToken(input, connector, type, "string")
                    : null
                }
                defaultValue={input}
                className="input-box"
                onChange={e =>
                  this.setState({
                    input: e.target.value,
                    varValue: e.target.value
                  })
                }
                style={styles}
              />
            )}
          </div>
        );
      case "Operator":
        return (
          <div
            className="token operator"
            onClick={() => this.testValidator(test)}
          >
            {display || (
              <input
                autoFocus
                onBlur={() =>
                  this.validateToken(input, connector, type, "string")
                }
                onKeyUp={e =>
                  e.keyCode === 13
                    ? this.validateToken(input, connector, type, "string")
                    : null
                }
                defaultValue={input}
                className="input-box"
                onChange={e => this.setState({ input: e.target.value })}
                style={styles}
              />
            )}
          </div>
        );
      default:
        return (
          <div style={this.props.styles}>
            FillIn: {this.props.value}: test: {JSON.stringify(this.props.test)}
            <input style={this.props.styles} />
          </div>
        );
    }
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  { updateGridValues }
)(FillIn);
