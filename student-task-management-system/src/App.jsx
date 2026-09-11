import "./App.css";
import Navbar from "./components/Navbar";
import DashBoard from "./components/DashBoard";
import Tasks from "./components/Tasks";
import Welcome from "./components/welcome";
import TaskDetails from "./components/TaskDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Welcome />

      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </div>
  );
}

export default App;