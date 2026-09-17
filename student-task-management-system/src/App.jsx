import "./App.css";
import Navbar from "./components/Navbar";
import DashBoard from "./components/DashBoard";
import Tasks from "./components/Tasks";
import Welcome from "./components/welcome";
import TaskDetails from "./components/TaskDetails";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Tasks API returned an invalid response");
        }
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAddTask = (newTask) => {
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const handleToggleTask = (taskToToggle) => {
    const taskId = taskToToggle._id || taskToToggle.id;
    const nextStatus = taskToToggle.status.toLowerCase() === "pending" ? "Completed" : "Pending";

    fetch(`/api/tasks/${taskId}`, {
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
        setTasks((currentTasks) => currentTasks.map((task) =>
          (task._id || task.id) === (updatedTask._id || updatedTask.id) ? updatedTask : task
        ));
      })
      .catch((error) => {
        console.error("Error toggling task:", error);
      });
  };

  const handleDeleteTask = (taskId) => {
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
        setTasks((currentTasks) => currentTasks.filter((task) => (task._id || task.id) !== taskId));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <Welcome />

      <Routes>
        <Route
          path="/"
          element={
            <DashBoard
              tasks={tasks}
              isLoading={isLoading}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <Tasks
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          }
        />
        <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} />} />
      </Routes>
    </div>
  );
}

export default App;