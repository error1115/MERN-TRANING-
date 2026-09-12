import { useParams } from "react-router-dom";

function TaskDetails({ tasks }) {
    const { id } = useParams();
    const task = tasks.find((currentTask) => currentTask.id === Number(id));

    if (!task) {
        return <p>Task not found.</p>;
    }

    return (
        <div>
            <h1>Task Details</h1>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
        </div>
    );
}

export default TaskDetails;