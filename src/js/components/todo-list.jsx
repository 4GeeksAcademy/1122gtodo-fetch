
import React, {useEffect, useState} from "react";
import Fetching from "./fetching ";

function Todo(){
    const [taskList, setTaskList ] = useState(["clean room", "Eat Breakfast"]);
    const [newTask, setNewTask] = useState('')
    const [footer, setFooter] = useState()
    const taskLeft = taskList.length

    function addTask() {
    if (!newTask.trim()) return;

    const taskObject = {
        label: newTask,
        done: false,  // assuming a new task is incomplete by default
    };

    // Send task to API
    fetch(URL+"todos/"+ username), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskObject),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to add task");
        }
        return response.json();
    })
    .then(() => {
        setTaskList([...taskList, newTask]); // Update local state
        setNewTask("");  // Clear input field
    })
    .catch(error => console.error("Error adding task:", error));
}
    }


    function deleted (index){
         setTaskList(taskList.filter((_,i)=> i!==index))
    }
    useEffect(()=>{setFooter(`${taskLeft} task left`)},[taskList])
      

    return( 
        <div className="todoInput">
            <input type="text" onChange={e => setNewTask(e.target.value)} value={newTask}  placeholder="What needs to be done"/>
            <button className="btn addButton" onClick={add}>Add</button>
            
            <div className="taskToDo">
                <ul className="taskUl">
                    {taskList.map((task,index)=>
                    <li key={index}>
                         <p>{task}<button className="close" onClick={()=>deleted(index)}>x</button></p>
                         
                    </li>)
                    }
                </ul>
            </div>
            <div className="todoFooter">
              <p>{footer}</p>
            </div>
        </div>
        
    )

    
}
export default Todo