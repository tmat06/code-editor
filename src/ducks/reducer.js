var initialState = {
  parts: [
    {
      id: 1,
      title: "Lesson 1.1",
      description:
        "We can use the keyword var to declare variables, and name that spot in memory. Name the variable greeting below.",
      testMode: "Fill in",
      tokens: [
        {
          type: "VarKeyword",
          value: "VarName",
          test: false,
          prompt: "none"
        },
        {
          type: "VarName",
          value: "greeting",
          test: true,
          prompt: "none"
        },
        ";"
      ]
    },
    {
      id: 2,
      title: "Lesson 1.2",
      description:
        'Words are represented in memory as a type of data  called "strings". To create a string, we surround a word with quotes. We can also store strings in our variables using the assignment operator (= sign). Store whatever string you want into our greeting variable.',
      testMode: "Fill in",
      tokens: [
        {
          type: "VarKeyword",
          value: "var",
          test: false,
          prompt: "none"
        },
        {
          type: "VarName",
          value: "greeting",
          test: false,
          prompt: "none"
        },
        "=",
        {
          type: "String",
          value: "",
          test: true,
          prompt: "none"
        },
        ";"
      ]
    },
    {
      id: 3,
      title: "Lesson 1.3",
      description: "",
      testMode: "clickable",
      tokens: [
        {
          type: "VarKeyword",
          value: "var",
          test: false,
          prompt: "none"
        },
        {
          type: "VarName",
          value: "greeting",
          test: true,
          prompt: "Click on the variable name that holds the value of 'hello'."
        },
        "=",
        {
          type: "String",
          value: "hello",
          test: false,
          prompt: "none"
        }
      ]
    }
  ]
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
