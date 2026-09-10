import { useState } from "react";

function AddTask(props){
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    function handleSubmit(event){
        event.preventDefault();
        const task={
            id:Date.now(),title:title,
            description:description,
            status:"pending"
        }
        console.log("form submitted");

    }
    return(
        
        <div>
            
            <h2>Add Task</h2>
            <h3>Add title</h3>
            
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            
            <h3>Add description</h3>
            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <br></br>
            <button type="submit">Add Task</button>
       
        </div>
        
    );
}
export default AddTask;
