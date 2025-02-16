
import React, {useEffect, useState} from "react";

function Todo(){
    const [taskList, setTaskList ] = useState(["clean room", "Eat Breakfast"]);
    const [newTask, setNewTask] = useState('')
    const [footer, setFooter] = useState()
    const taskLeft = taskList.length

    function add() {
    if (newTask.trim() === "") {
        alert("Please add a task");
        return;
    }

    const taskObject = {
        label: newTask,
        done: false, 
    };

    // Fetch the existing tasks first
    fetch(`https://playground.4geeks.com/todo/${userName}`)
    .then(response => response.json())
    .then(existingTasks => {
        if (!Array.isArray(existingTasks)) existingTasks = [];

        // Add the new task to the list
        const updatedTasks = [...existingTasks, taskObject];

        // Send the updated list back to the API using PUT
        return fetch(`https://playground.4geeks.com/todo/${userName}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTasks),
        });
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to update tasks");
        return response.json();
    })
    .then(() => {
        // Fetch the updated task list and update state
        return fetch(`https://playground.4geeks.com/todo/${userName}`);
    })
    .then(response => response.json())
    .then(updatedTasks => {
        setTaskList(updatedTasks); // Update the state with the new list
        setNewTask(""); // Clear the input field
    })
    .catch(error => console.error("Error adding task:", error));
};

    }
    function deleted (index){
         setTaskList(taskList.filter((_,i)=> i!==index))
    }
    function deleteAllTasks() {
        fetch(`https://playground.4geeks.com/users/${userName}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to delete tasks");
            return response.json();
        })
        .then(() => {
            setTaskList([]);
            alert("All tasks deleted successfully!");
        })
        .catch(error => console.error("Error deleting tasks:", error));
    }
    
      

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
              <p>{taskLeft} task{taskLeft !==1? "s": " "} left</p> <button onClick={()=>deleteAllTasks()}>delete all</button>
            </div>
        </div>
        
    )

    

export default Todo