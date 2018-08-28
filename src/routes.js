import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import LessonPartsList from "./components/LessonPartsList";

export default (
  <Switch>
    <Route exact path="/" component={() => <Landing />} />
    <Route path="/lessonPartsList/:lesson" component={LessonPartsList} />
  </Switch>
);
