import { useEffect, useReducer, useState } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import "@/components/TodoApp/TodoApp.styles.scss"

import todoReducer from "@/reducer/TodoReducer"
import TodoItem from "@/components/TodoApp/TodoItem"
import TodoAction from "@/components/TodoApp/TodoAction"
import TodoHeader from "@/components/TodoApp/TodoHeader"

const TodoApp = () => {
  const [filter, setFilter] = useState("all")
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const todosStorage = localStorage.getItem('todos')
    if (todosStorage) {
      return JSON.parse(todosStorage)
    } else {
      return []
    }
  })

  const [content, setContent] = useState("")
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      document.body.classList.remove('light')
    } else {
      document.body.classList.remove('dark')
      document.body.classList.add('light')
    }
  }, [isDark])

  const addTodo = (e) => {
    e.preventDefault()
    if (content.length === 0) {
      return
    }
    dispatch({
      type: 'ADD_TODO',
      todo: {
        content
      }
    })

    setContent("")
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch({
      type: "REORDER_TODO", todo: {
        todos: items
      }
    })
  }

  const displayTodosFilter = (filter) => {
    if (filter === "all") {
      return todos;
    } else if (filter === "active") {
      return todos.filter(todo => !todo.isComplete)
    } else {
      return todos.filter(todo => todo.isComplete)
    }
  }

  return (
    <div className="todo">
      <TodoHeader isDark={isDark} setIsDark={setIsDark} />
      <div className="todo__content">
        <div className="todo__container">
          <form className="todo__form" onSubmit={addTodo}>
            <div className="todo__input__container">
              <input type="text" placeholder="Create a new todo..." value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
          </form>
          <div className="todo__list__action">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="todos">
                {(provided) => (
                  <div className="todo__list" ref={provided.innerRef} {...provided.droppableProps}>
                    {displayTodosFilter(filter).map((item, index) => (
                      <TodoItem {...item} dispatch={dispatch} index={index} key={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <TodoAction todos={todos} setFilter={setFilter} dispatch={dispatch} />
          </div>
        </div>
      </div>
      <div className="todo__sp__filter">
        <div className="todo__container">
          <div>
            <button className="todo__filter" onClick={() => setFilter('all')}>All</button>
            <button className="todo__filter" onClick={() => setFilter('active')}>Active</button>
            <button className="todo__filter" onClick={() => setFilter('completed')}>Completed</button>
          </div>
        </div>
      </div>
      <div className="todo__note">
        <div className="todo__container">
          <p>Drag and drop to reorder list</p>
        </div>
      </div>
    </div>
  )
}

export default TodoApp
