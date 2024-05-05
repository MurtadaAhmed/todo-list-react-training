import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";

export default function ToDoList() {

    const [todos, setToDos] = useState([])

    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/todos/")
        .then(res => res.json())
        .then(data => {
            const todos = Object.values(data)
            setToDos(todos)
            console.log(todos)
        })
        .catch(err => console.error(err))
    }, [])

    const ChangeStatusHandler = (todoId) => {
        setToDos(todos.map(todo => {
            if (todo._id === todoId) {
                const updatedTodo = {...todo, isCompleted: !todo.isCompleted}
                fetch(`http://localhost:3030/jsonstore/todos/${todoId}`, {
                    method: "put",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(updatedTodo)
                })
                .then(response => response.json())
                .then(date => console.log(date))
                .catch(err => console.error(err))
                return updatedTodo
            }
            return todo
        }))
    }

    return (
        <section className="todo-list-container">
            <h1>Todo List</h1>

            <div className="add-btn-container">
                <button className="btn">+ Add new Todo</button>
            </div>

            <div className="table-wrapper">

                {/* <div className="loading-container">
                    <div className="loading-spinner">
                        <span className="loading-spinner-text">Loading</span>
                    </div>
                </div> */}

                <table className="table">
                    <thead>
                        <tr>
                            <th className="table-header-task">Task</th>
                            <th className="table-header-status">Status</th>
                            <th className="table-header-action">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {todos.map(todo =>
                            <ToDoItem 
                            key={todo._id}
                            _id={todo._id}
                            text={todo.text}
                            isCompleted={todo.isCompleted}
                            ChangeStatusHandler={ChangeStatusHandler}
                            />
                        )}

                        

                    </tbody>
                </table>
            </div>
        </section>
    );
}