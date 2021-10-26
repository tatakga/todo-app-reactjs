import CrossIcon from "@/images/icon-cross.svg"
import { Draggable } from "react-beautiful-dnd"

const TodoItem = ({ id, content, isComplete, index, dispatch }) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div className={`todo__item ${isComplete ? 'complete' : ''}`} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <button className="todo__toggle" onClick={() => dispatch({ type: "TOGGLE_TODO", todo: { id: id } })}></button>
          <p className="todo__text">{content}</p>
          <button className="todo__delete" onClick={() => dispatch({ type: "REMOVE_TODO", todo: { id: id } })}>
            <img src={CrossIcon} alt="" />
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default TodoItem
