import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      lessons: []
    };
  }

  componentDidMount() {
    //needs to store all lessons
    axios
      .get("/api/lessons")
      .then(results => this.setState({ lessons: [...results] }));
  }

  render() {
    console.log(this.state.lessons);
    let { lessons } = this.state;
    return (
      <div>
        {lessons.map((val, i) => {
          return (
            <div className="landing">
              <div className="button">Lesson </div>
            </div>
          );
        })}
      </div>
    );
  }
}
