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
  gridValues: []
};

//define action.type's
const UPDATE_LESSON = "UPDATE_LESSON";
const UPDATE_GRID_VALUES = "UPDATE_GRID_VALUES";
const RESET_GRID_VALUES = "RESET_GRID_VALUES";
//

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LESSON:
      return Object.assign({}, state, { parts: action.payload });

    case UPDATE_GRID_VALUES:
      console.log(state);
      let temp = [...state.gridValues];
      let match = {};
      var { value, connector, type } = action.payload;

      if (type === "VarName") {
        let index;
        temp.map((val, i) => {
          if (val.value === connector) {
            index = i;
            match = val;
          }
        });
        if (match[0]) {
          temp[index].varName = value;
        } else {
          match = { value: "", varName: value };
          temp.push(match);
        }
      } else if (type === "String") {
        let index;
        temp.map((val, i) => {
          if (val.varName === connector) {
            index = i;
            match = val;
          }
        });

        if (match.varName || match.value) {
          temp[index].value = value;
        } else {
          match = { value: value, varName: "" };
          temp.push(match);
        }
      }
      // temp.push({ varName, varValue });
      return Object.assign({}, state, { gridValues: [...temp] });

    case RESET_GRID_VALUES:
      return Object.assign({}, state, { gridValues: [] });
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

export function resetGridValues() {
  return { type: RESET_GRID_VALUES };
}
