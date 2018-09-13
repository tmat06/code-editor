import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import MakeLessons from "./components/MakeLessons";

import ComponentStyles from "./components/ComponentStyles";

export default (
  <Switch>
    <Route exact path="/" component={() => <Landing />} />
    <Route path="/:lesson/:part" component={CodeEditor} />

    {/* temporary route for testing custom styled buttons/cards/etc */}
    <Route path="/styles" component={ComponentStyles} />
    <Route path="/makeLesson" component={MakeLessons} />
  </Switch>
);
