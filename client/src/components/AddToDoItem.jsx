import { useState } from "react"

export default function AddToDoItem({onAddTask}){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newTask, setNewTask] = useState("")

function handleInputChange(e){
    setNewTask(e.target.value)
}

function handleOpenModal(){
    setIsModalOpen(true)
}

function handleCloseModal(){
    setIsModalOpen(false)
}

function handleSubmit(){
    fetch("http://localhost:3030/jsonstore/todos/", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({text: newTask, isCompleted:false})
    })
    .then(response => response.json())
    .then(data => onAddTask(data))
    .catch(err => console.error(err))
    
    setNewTask("")
    setIsModalOpen(false)
}


    return (
        <>
        <div className="add-btn-container">
            <button className="btn" onClick={handleOpenModal}>+ Add new Todo</button>
        </div>
        {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Add New Task</h2>
                    <input type="text" value={newTask} onChange={handleInputChange}/>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={handleCloseModal}>Close</button>
                </div>
            </div>
        )}
        
        
        </>
    )
}