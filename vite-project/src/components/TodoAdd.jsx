import React from "react";
import PropTypes from "prop-types";

function TodoAdd({ todo, setTodo, addTodo, category, setCategory, time, setTime }) {
    const isCategorySelected = category !== "";
    const isTimeSelected = time !== "";
    const [categoryError, setCategoryError] = React.useState(false);
    const [timeError, setTimeError] = React.useState(false);

    const handleAddTodo = (event) => {
        if (event.key === "Enter") {
            if (!isCategorySelected) {
                setCategoryError(true);
            } else {
                setCategoryError(false);
            }

            if (!isTimeSelected || isNaN(time) || parseInt(time) < 0) {
                setTimeError(true);
            } else {
                setTimeError(false);
                addTodo(event);
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                className="todo-input"
                value={todo}
                placeholder="What needs to be done today?"
                onChange={(event) => setTodo(event.target.value)}
                onKeyUp={handleAddTodo}
            />
            <select
                className={`category-select ${!isCategorySelected ? "error" : ""}`}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            >
                <option value="">Wybierz kategorię</option>
                <option value="Work">Work</option>
                <option value="Hobby">Hobby</option>
                <option value="House Chores">House Chores</option>
                <option value="Fitness">Fitness</option>
                <option value="Reading">Reading</option>
                <option value="Learning">Learning</option>
                <option value="Music">Music</option>
                <option value="Travel">Travel</option>
                <option value="Art">Art</option>
                <option value="Cooking">Cooking</option>
                <option value="Technology">Technology</option>
                <option value="Gaming">Gaming</option>
                <option value="Movies">Movies</option>
                <option value="Shopping">Shopping</option>
                <option value="Social">Social</option>
                <option value="Health">Health</option>
                <option value="Self-Care">Self-Care</option>
                <option value="Productivity">Productivity</option>
                <option value="Education">Education</option>
                <option value="Family">Family</option>
                <option value="Pets">Pets</option>
                <option value="Random">Random</option>
                <option value="Default">Something Different</option>
            </select>
            {categoryError && (
                <div className="error-message-category">
                    Wybierz kategorię*
                </div>
            )}
            <input
                type="number"
                className={`time-input ${!isTimeSelected ? "error" : ""}`}
                value={time}
                placeholder="Time in minutes"
                onChange={(event) => setTime(event.target.value)}
            />
            {timeError && (
                <div className="error-message-time">
                    Podaj poprawny czas*
                </div>
            )}
        </div>
    );
}

TodoAdd.propTypes = {
    todo: PropTypes.string.isRequired,
    setTodo: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
    time: PropTypes.string.isRequired,
    setTime: PropTypes.func.isRequired,
};

export default TodoAdd;