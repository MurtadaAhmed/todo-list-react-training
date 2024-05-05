export default function ToDoItem({_id, text, isCompleted, ChangeStatusHandler}) {

    function onChangeStatusClick() {
        ChangeStatusHandler(_id)
    }

    return (
        <tr className={`todo${isCompleted ? " is-completed" : ""}`}>
              <td>{text}</td>
              <td>{isCompleted ? "Completed" : "Not Completed"}</td>
              <td className="todo-action">
                <button onClick={onChangeStatusClick} className="btn todo-btn">Change status</button>
              </td>
            </tr>
    )
}