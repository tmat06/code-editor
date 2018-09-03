var initialState = {
  parts: [
    {
      title: "",
      description: "",
      testMode: "",
      tokens: [
        {
          id: 0,
          number: 0,
          partnumber: 0,
          type: "",
          value: "",
          test: false,
          prompt: "none",
          lessonnumber: 0
        }
      ]
    }
  ]
  // title: "",
  // description: "",
  // testMode: "",
  // tokens: [
  //   {
  //     type: "",
  //     value: "",
  //     test: "",
  //     prompt: ""
  //   }
  // ]
};

//define action.type's
const UPDATE_LESSON = "UPDATE_LESSON";
//

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LESSON:
      return Object.assign({}, state, { parts: action.payload });
    default:
      return state;
  }
}

//action creators
export function updateLesson(lesson) {
  return { type: UPDATE_LESSON, payload: lesson };
}
