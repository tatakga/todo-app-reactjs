import randomId from "@/helpers/random-id";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const newId = randomId();
      return [...state, { id: newId, content: action.todo.content, isComplete: false }];

    case "TOGGLE_TODO":
      return state.map((todo) => {
        if (todo.id === action.todo.id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
          };
        }
        return todo;
      });

    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.todo.id);

    case "REORDER_TODO":
      return action.todo.todos;

    case "CLEAR_COMPLETE_TODO":
      return state.filter((todo) => !todo.isComplete);

    default:
      return state;
  }
};

export default todoReducer;
