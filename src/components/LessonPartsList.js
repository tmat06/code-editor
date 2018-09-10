import React from "react";
import { updateLesson } from "./../ducks/reducer";
import { connect } from "net";
import axios from "axios";

class LessonPartsList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { lesson } = this.props.match.params;
    axios.get(`/api/lesson/${lesson}`).then(lessonInfo => {
      this.props.updateLesson(lessonInfo);
    })
    //call to the database using this.props.match.params.lesson to indicate which lesson needs to be pushed up to redux
  }
  render() {
    return <div>Dog</div>;
  }
}

function mapStateToProps(state) {
  state;
}

export default connect(
  mapStateToProps,
  { updateLesson }
)(LessonPartsList);
