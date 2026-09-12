import TaskCard from "./TaskCaed";
import StatCard from "./StatCard";
import AddTask from "./AddTask";

function DashBoard({ tasks, setTasks }) {

    function toggleTask(id) {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
                    : task
            )
        );
    }

    function addTask(newTask) {
        setTasks((currentTasks) => [newTask, ...currentTasks]);
    }

    function deleteTask(taskId) {
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
    }

    const totalTasks = tasks.length;
    const remainingTasks = tasks.filter((task) => task.status === "pending").length;
    const completedTasks = tasks.filter((task) => task.status === "completed").length;

    return (
        <main className="dashboard-page">
            <div className="stats-container">
                <StatCard title={"Total Tasks"} value={totalTasks} />
                <StatCard title={"Remaining Tasks"} value={remainingTasks} />
                <StatCard title={"Completed Tasks"} value={completedTasks} />
            </div>

            <AddTask onAddTask={addTask} />

            <section className="task-section">
                <div className="section-title-row">
                    <h2>Recent Tasks</h2>
                </div>

                <div className="tasks-container">
                    {tasks.length === 0 ? (
                        <div className="empty-state">No tasks yet. Add one to get started.</div>
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
            </section>
        </main>
    );
}

export default DashBoard;