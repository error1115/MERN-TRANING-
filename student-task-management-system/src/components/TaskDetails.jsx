import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TaskDetails({ tasks }) {
    const { id } = useParams();
    const [fetchedTask, setFetchedTask] = useState(null);
    const [loading,setLoading]=useState(true);
    const existingTask = tasks.find((currentTask) => currentTask.id === Number(id));

    useEffect(() => {
        if (existingTask) {
            return;
        }

        fetch(`/api/tasks/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Task request failed: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setFetchedTask({ id, task: data }))
            .catch((error) => console.error("Error fetching task:", error))
            .finally(() => {
                setLoading(false);
            });
    }, [id, existingTask]);

    const task = existingTask || (fetchedTask?.id === id ? fetchedTask.task : null);
    if(loading){
        return <h2>Loading....</h2>
    }
    if (!task) {
        return <p>Task not found.</p>;
    }

    return (
        <main className="dashboard-page">
            <h1>Task Details</h1>
            <div className={`task-card ${task.status === "completed" ? "completed" : "pending"}`}>
                <div className="task-content">
                    <div className="task-header-row">
                        <h3>{task.title}</h3>
                        <span className="status-badge">{task.status}</span>
                    </div>
                    <p>{task.description}</p>
                </div>
            </div>
        </main>
    );
}

export default TaskDetails;