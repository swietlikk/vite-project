import React from "react";
import { Headline } from "./components/Headline.jsx";
import TodoAdd from "./components/TodoAdd.jsx";
import TodoList from "./components/TodoList.jsx";
import TimeCalculator from "./components/TimeCalculator.jsx";
import HourToMinuteCalculator from "./components/HourToMinuteCalculator";


import './App.scss';
import useLocalStorage from "./hooks/useLocalStorage.js";
import { useState } from "react";

function App() {
    const [todo, setTodo] = useLocalStorage('task');
    const [todos, setTodos] = useLocalStorage('tasks');
    const [category, setCategory] = useState("");
    const [time, setTime] = useState("");

    const getId = (todos) => todos.length === 0 ? 1 : Math.max(...todos.map((task) => task.id)) + 1;

    const handleAddTodo = (evt) => {
        if (evt.key === "Enter" && todo.trim().length >= 3 && category !== "" && time !== "") {
            setTodos([
                {
                    id: getId(todos),
                    status: "in progress",
                    title: todo,
                    category: category,
                    time: time === "" ? 0 : parseInt(time),
                },
                ...todos,
            ]);
            setTodo("");
            setTime("");
            setCategory("");
        }
    };

    const handleChangeStatus = (task) => {
        task.status = task.status === 'in progress' ? 'done' : 'in progress';
        setTodos([...todos]);
    };

    const handleDeleteTodo = (todo) => {
        setTodos(todos.filter((task) => task !== todo));
    };

    const handleDeleteDoneTasks = () => {
        setTodos(todos.filter((task) => task.status !== 'done'));
    };

    return (
        <div className="todoapp">
            <Headline />
            <section className="todos">
                <TodoAdd
                    todo={todo}
                    setTodo={setTodo}
                    addTodo={handleAddTodo}
                    category={category}
                    setCategory={setCategory}
                    time={time}
                    setTime={setTime}
                />
                <TodoList
                    todos={todos}
                    handleChangeStatus={handleChangeStatus}
                    handleDeleteTodo={handleDeleteTodo}
                />

                <div className="box">
                    <p className="counter">{todos.filter((task) => task.status === 'in progress').length} items left</p>
                    {todos.some((task) => task.status === 'done') && (
                        <>
                            <button
                                className="btn"
                                onClick={handleDeleteDoneTasks}
                            >
                                Clear completed
                            </button>
                            <div className="btn-delete-container">
                                {todos.map((task) => (
                                    <button
                                        key={task.id}
                                        className="btn-delete"
                                        onClick={() => handleDeleteTodo(task)}
                                    >
                                        X
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
            <TimeCalculator />
            <HourToMinuteCalculator/>
        </div>
    );
}

export default App;