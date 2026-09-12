import "./App.css";
import Navbar from "./components/Navbar";
import DashBoard from "./components/DashBoard";
import Tasks from "./components/Tasks";
import Welcome from "./components/welcome";
import TaskDetails from "./components/TaskDetails";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "This is the description for Task 1",
    status: "pending",
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is the description for Task 2",
    status: "completed",
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is the description for Task 3",
    status: "pending",
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div>
      <Navbar />
      <Welcome />

      <Routes>
        <Route path="/" element={<DashBoard tasks={tasks} setTasks={setTasks} />} />
        <Route path="/tasks" element={<Tasks tasks={tasks} />} />
        <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} />} />
      </Routes>
    </div>
  );
}

export default App;