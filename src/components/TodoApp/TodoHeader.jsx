import SunIcon from "@/images/icon-sun.svg"
import MoonIcon from "@/images/icon-moon.svg"

const TodoHeader = ({ isDark, setIsDark }) => {
  return (
    <div className="todo__header">
      <div className="todo__container">
        <h1>TODO</h1>
        <button onClick={() => setIsDark(prev => !prev)}>
          <img src={isDark ? MoonIcon : SunIcon} alt="" />
        </button>
      </div>
    </div>
  )
}

export default TodoHeader
