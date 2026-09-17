import TaskCard from "./TaskCaed";

function Tasks({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <main className="dashboard-page">
      <h1>Tasks</h1>
      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id || task.id}
              id={task._id || task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              onToggle={() => onToggleTask(task)}
              onDelete={() => onDeleteTask(task._id || task.id)}
            />
          ))
        )}
      </div>
    </main>
  );
}
export default Tasks;