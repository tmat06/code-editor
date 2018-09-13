var initialState = {
  parts: [],
  gridValues: [],
  correct: true
};

//define action.type's
const UPDATE_LESSON = "UPDATE_LESSON";
const UPDATE_GRID_VALUES = "UPDATE_GRID_VALUES";
const RESET_GRID_VALUES = "RESET_GRID_VALUES";
const TOGGLE_ANSWER = "TOGGLE_ANSWER";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LESSON:
      return Object.assign({}, state, { parts: action.payload });

    case UPDATE_GRID_VALUES:
      var { value, connector, type } = action.payload;
      let temp = [...state.gridValues];
      // any matches will be stored on the match object
      let match = {};

      if (type === "VarName") {
        let index;
        temp.map((val, i) => {
          //Runs through all variables stored on the gridValues to see if the values match the connector of the input
          if (val.value === connector) {
            index = i;
            match = val;
          }
        });
        //Checks to see if Match has a varName or a value in it, if so, then update that object at the designated index with the new value
        if (match.varName || match.value) {
          temp[index].varName = value;
        } else {
          match = { value: "", varName: value };
          temp.push(match);
        }
      }
      //Similar but for "String" data types
      if (type === "String") {
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
      return Object.assign({}, state, { gridValues: [...temp] });

    case RESET_GRID_VALUES:
      return Object.assign({}, state, { gridValues: [] });

    case TOGGLE_ANSWER:
      return Object.assign({}, state, { correct: !state.correct });

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

export function toggleAnswer() {
  return { type: TOGGLE_ANSWER };
}
