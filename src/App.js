import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import routes from "./routes";
import { ToastContainer } from 'react-toastify';

class App extends Component {
  render() {
    const { goBack, goForward } = this.props.history;
    return (
      <div className="app">
        <ToastContainer position="top-center" autoClose={1500} hideProgressBar={true}/>
        <nav>
          <ul>
            <li onClick={ goBack }>Back</li>
            <li onClick={ goForward}>Forward</li>
          </ul>
        </nav>
          {routes}
      </div>
    );
  }
}

export default withRouter(App);
