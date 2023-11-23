import PropTypes from "prop-types";
import TodoItem from "./TodoItem.jsx";

function TodoList({ todos, handleChangeStatus, handleDeleteTodo, handleEditTask }) {
    return (
        <ul className="todos-list">
            {todos.map((task) => (
                <TodoItem
                    key={task.id}
                    handleChangeStatus={handleChangeStatus}
                    handleDeleteTodo={handleDeleteTodo}
                    handleEditTask={handleEditTask}
                    task={task}
                />
            ))}
        </ul>
    );
}
TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    handleChangeStatus: PropTypes.func.isRequired,
    handleDeleteTodo: PropTypes.func.isRequired
}

export default TodoList;