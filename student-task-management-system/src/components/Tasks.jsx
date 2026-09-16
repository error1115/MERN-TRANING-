import TaskCard from "./TaskCaed";

function Tasks({ tasks, setTasks }) {
  function toggleTask(id) {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (!taskToToggle) return;

    const nextStatus = taskToToggle.status === "pending" ? "completed" : "pending";

    fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Task update failed: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedTask) => {
        setTasks((currentTasks) =>
          currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
      })
      .catch((error) => {
        console.error("Error toggling task:", error);
      });
  }

  function deleteTask(taskId) {
    fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Delete failed: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }

  return (
    <main className="dashboard-page">
      <h1>Tasks</h1>
      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))
        )}
      </div>
    </main>
  );
}
export default Tasks;