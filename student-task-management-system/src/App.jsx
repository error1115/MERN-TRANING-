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
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAddTask = (newTask) => {
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const handleToggleTask = (taskToToggle) => {
    const nextStatus = taskToToggle.status === "pending" ? "completed" : "pending";

    fetch(`/api/tasks/${taskToToggle.id}`, {
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
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
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
        <Route path="/tasks" element={<Tasks tasks={tasks} setTasks={setTasks} />} />
        <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} />} />
      </Routes>
    </div>
  );
}

export default App;