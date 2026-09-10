import TaskCard from "./TaskCaed";
import StatCard from "./StatCard";
import AddTask from "./AddTask";    
import { useState } from "react";
function DashBoard() {
    
    const [tasks, setTasks]=useState([{id:1, title:"learn react", 
        description:"understanding components" ,
        status:"pending"},
        {id:2, title:"learn SQL",
             description:"understanding queries",
              status:"completed"},
        {id:3, title:"learn DSA",
             description:"understanding ",
             status:"completed"}]);
             function toggleTask(id){
                setTasks((currentTasks) => currentTasks.map((task) =>
                    task.id === id
                        ? {...task, status: task.status === "pending" ? 
                            
                            "completed" : "pending"}
                        : task
                ));
               }
               function addTask(newTask){
                console.log("newtask:",newtask)
               }
    return (
         <main>
                  
        <div className="sat-container">
            <StatCard title={"Total Tasks"} value={10}/>
            <StatCard title={"Remaining Tasks "} value={3}/>
            <StatCard title={"Completed Tasks"} value={7}/>
        </div>
        <AddTask onAddTask ={addTask}/>
        <h2> Recent Task </h2>
        <div className="tasks-container"> 
         {tasks.map((task)=>(
            <TaskCard title ={task.title} description={task.description}
            status={task.status} 
            onToggle={()=>toggleTask(task.id)}/>
        
            ))};
         
        </div>
        </main>
);
}

export default DashBoard;