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
  ],
  gridValues: [
    { num: 1011, name: "Var Name", value: "Value" },
    { num: 1012, name: "Var Name", value: "Value" },
    { num: 1013, name: "Var Name", value: "Value" },
    { num: 1014, name: "Var Name", value: "Value" },
    { num: 1015, name: "Var Name", value: "Value" },
    { num: 1016, name: "Var Name", value: "Value" },
    { num: 1017, name: "Var Name", value: "Value" },
    { num: 1018, name: "Var Name", value: "Value" },
    { num: 1019, name: "Var Name", value: "Value" }
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
const UPDATE_GRID_VALUES = "UPDATE_GRID_VALUES";
//

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LESSON:
      return Object.assign({}, state, { parts: action.payload });
    case UPDATE_GRID_VALUES:
      let temp = [...state.gridValues];
      var { varName, value } = action.payload;
    default:
      return state;
  }
}

//action creators
export function updateLesson(lesson) {
  return { type: UPDATE_LESSON, payload: lesson };
}

export function updateGridValues(value) {
  return { type: UPDATE_GRID_VALUES, payload: value };
}
