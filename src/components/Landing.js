import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { updateLesson } from "./../ducks/reducer";
import { connect } from "react-redux";

class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      lessons: [],
      parts: [],
      currentLesson: 0
    };
  }

  componentDidMount() {
    //Retrieves all Lessons from DB and sets it to Local State
    axios
      .get("/api/lessons")
      .then(results => this.setState({ lessons: [...results.data] }));
  }

  partRetriever(lessonNum) {
    //Retrieves all parts of the Lesson, runs onClick, stores it Locally and on Redux
    axios.get(`/api/parts/${lessonNum}`).then(results => {
      this.setState({ parts: [...results.data], currentLesson: lessonNum });
      this.props.updateLesson(results.data);
    });
  }

  render() {
    let { lessons, parts, currentLesson } = this.state;
    return (
      <div>
        {lessons.map(val => {
          return (
            <div className="landing" key={val.id}>
              <div
                className="button"
                onClick={() => this.partRetriever(val.number)}
              >
                <div>
                  Lesson {val.number}
                  <br />
                  {val.topic}
                </div>
              </div>
            </div>
          );
        })}
        {parts.map((val, i) => {
          return (
            <Link to={`/${currentLesson}/${i + 1}`} key={i}>
              <div className="button outline-btn">
                {/* can be replaced with val.title once database has correct information */}
                {val.title}
              </div>
            </Link>
          );
        })}
        {/* Allows quiz to only appear during parts display */}
        {this.state.parts[0] ? (
          <Link to={`/${currentLesson}/${0}`}>
            <div className="button outline-btn">QUIZ</div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { parts: state.parts };
}

export default connect(
  mapStateToProps,
  { updateLesson }
)(Landing);
