import React from "react";
import { updateLesson } from "./../ducks/reducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class LessonPartsList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { lesson } = this.props.match.params;
    axios.get(`/api/lessons/${lesson}`).then(response => {
      this.props.updateLesson(response.data);
    });
    // const { lesson } = this.props.match.params;
    //call to the database using this.props.match.params.lesson to indicate which lesson needs to be pushed up to redux
    //axios.get(`some endpoint/ ${lesson}`).then(res => this.props.updateLesson(res.data))
  }
  render() {
    const { lesson } = this.props.match.params;
    //because our redux is not getting updated from a database call, our data will render the 1.1 lesson plan
    let { parts } = this.props;
    return (
      <div>
        {parts ? (
          parts.map((val, i) => {
            return (
              <Link to={`/${lesson}/${i + 1}`} key={val.id}>
                <div className='button outline-btn'>
                  {/* can be replaced with val.title once database has correct information */}
                  {val.title}
                </div>
              </Link>
            );
          })
        ) : (
          <div>Dog</div>
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
)(LessonPartsList);
