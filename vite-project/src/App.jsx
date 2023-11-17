import React, { useState } from 'react';
import { Headline } from './components/Headline.jsx';
import TodoAdd from './components/TodoAdd.jsx';
import TodoList from './components/TodoList.jsx';
import PieChartComponent from './components/PieChart.jsx';
import PieLegend from './components/PieLegend.jsx';
import TimeCalculator from './components/TimeCalculator.jsx';
import HourToMinuteCalculator from './components/HourToMinuteCalculator';

import './App.scss';
import useLocalStorage from './hooks/useLocalStorage.js';

const App = () => {
    const [todo, setTodo] = useLocalStorage('task');
    const [todos, setTodos] = useLocalStorage('tasks');
    const [category, setCategory] = useState('');
    const [time, setTime] = useState('');
    const [showDone, setShowDone] = useState(false);

    const getId = (todos) =>
        todos.length === 0 ? 1 : Math.max(...todos.map((task) => task.id)) + 1;

    const handleAddTodo = (evt) => {
        if (
            evt.key === 'Enter' &&
            todo.trim().length >= 3 &&
            category !== '' &&
            time !== ''
        ) {
            setTodos([
                {
                    id: getId(todos),
                    status: 'in progress',
                    title: todo,
                    category: category,
                    time: time === '' ? 0 : parseInt(time),
                },
                ...todos,
            ]);
            setTodo('');
            setTime('');
            setCategory('');
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

    const handleShowDone = () => {
        setShowDone(!showDone);
    };

    const pieChartData = showDone
        ? todos
            .filter((task) => task.status === 'done')
            .map((task) => ({ value: task.time, name: task.category }))
        : todos
            .filter((task) => task.status !== 'done')
            .reduce((acc, task) => {
                const existingCategory = acc.find((item) => item.name === task.category);
                if (existingCategory) {
                    existingCategory.value += task.time;
                } else {
                    acc.push({ value: task.time, name: task.category });
                }
                return acc;
            }, []);

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
                    <p className="counter">
                        {todos.filter((task) => task.status === 'in progress').length} item
                    </p>
                    {todos.some((task) => task.status === 'done') && (
                        <>
                            <button className="btn" onClick={handleDeleteDoneTasks}>
                                Delete Completed
                            </button>
                            <button className="btn" onClick={handleShowDone}>
                                <a className="btn-analyze" href="#pie-chart">Analyze your day</a>
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
            <HourToMinuteCalculator />
            <PieChartComponent data={pieChartData} />
            <PieLegend />
        </div>
    );
};

export default App;