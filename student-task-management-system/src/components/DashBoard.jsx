import TaskCard from "./TaskCaed";
import StatCard from "./StatCard";
function DashBoard() {
    const tasks=[{title:"learn react", 
        description:"understanding components" ,
        status:"completed"},
        {title:"learn SQL",
             description:"understanding queries",
              status:"compeleted"},
        {title:"learn DSA",
             description:"understanding ",
             status:"completed"}];
    return (
         <main>
        <div className="sat-container">
            <StatCard title={"Total Tasks"} value={10}/>
            <StatCard title={"Remaining Tasks "} value={3}/>
            <StatCard title={"Completed Tasks"} value={7}/>
        </div>
        <h2> Recent Task </h2>
        <div className="tasks-container"> 
         {tasks.map((task)=>(
            <TaskCard title ={task.title} description={task.description}
            status={task.status} />
            ))};
         
        </div>
        </main>
)};

export default DashBoard;