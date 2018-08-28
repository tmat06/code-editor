import React from "react";
import { updateLesson } from "./../ducks/reducer";
import { connect } from "net";

class LessonPartsList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { lesson } = this.props.match.params;
    //call to the database using this.props.match.params.lesson to indicate which lesson needs to be pushed up to redux
    this.props.updateLesson(lesson);
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
