import "./App.css";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";
import TaskCard from "./components/TaskCaed";
import Welcome from "./components/welcome"
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <div>
      <Navbar />
      <Welcome />
      <DashBoard />
    </div>
    
  );
}

export default App;