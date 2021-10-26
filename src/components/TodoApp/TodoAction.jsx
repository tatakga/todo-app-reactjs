const TodoAction = ({ todos, setFilter, dispatch }) => {
  return (
    <div className="todo__action">
      <p>
        {todos.filter(todo => !todo.isComplete).length} items left
      </p>
      <div>
        <button className="todo__filter" onClick={() => setFilter('all')}>All</button>
        <button className="todo__filter" onClick={() => setFilter('active')}>Active</button>
        <button className="todo__filter" onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <button className="todo__clear__complete" onClick={() => dispatch({ type: "CLEAR_COMPLETE_TODO" })}>Clear Completed</button>
    </div>
  )
}

export default TodoAction
