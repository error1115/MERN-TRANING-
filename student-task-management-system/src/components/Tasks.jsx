import TaskCard from "./TaskCaed";

function Tasks({ tasks }) {
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
            />
          ))
        )}
      </div>
    </main>
  );
}
export default Tasks;