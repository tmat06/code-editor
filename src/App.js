import React, { Component } from "react";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="app">
        <nav>
          <ul>
            <li>Back</li>
            <li>Forward</li>
          </ul>
        </nav>
        {routes}
      </div>
    );
  }
}

export default App;
