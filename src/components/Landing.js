import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div class="landing">
      <Link to="/lessonPartsList/1">
        <div>Lesson 1</div>
      </Link>
      <Link to="/lessonPartsList/2">
        <div>Lesson 2</div>
      </Link>
      <Link to="/lessonPartsList/3">
        <div>Lesson 3</div>
      </Link>
    </div>
  );
}
