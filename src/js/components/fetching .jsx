import { useEffect, useState } from "react";
import React from "react";
import Todo from "./todo-list";

const userName = "1122gs";
const URL = "https://playground.4geeks.com/todo/";

function Fetching() {
    const [taskList, setTaskList] = useState([]); 
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        getTodos(); // 
    }, []);

    // 1 Create a new user on the server using a POST request
    const createUser = async () => {
        try {
            const response = await fetch(URL + "users/" + userName, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([]),
            });

            if (!response.ok) {
                if (response.status === 400) {
                    console.log("User already exists, fetching tasks...");
                    getTodos();
                    return;
                } else {
                    throw new Error("Adding new user failed");
                }
            }

            console.log("User created successfully");
            getTodos();
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    
    const getTodos = async () => {
        try {
            const response = await fetch(URL +"users/" + userName);
            if (response.status === 404){
                await createUser()
                return;
            }
            
            if (!response.ok) throw new Error("Failed to fetch tasks");

            const data = await response.json();
            console.log("api reponse: ", data )
            if(data && Array.isArray(data.taskList)){
                setTaskList(data.taskList)

            } else{
                setErrorMessage("Expected an array and recieved: " + JSON.stringify(data.taskList ))
                setTaskList([])
            }
            
        } catch (error) {
            console.error("No task found:", error);
        }
    };

    // 
    const addTodos = async (newTask) => {
        if (!newTask.trim()) {
            alert("Please enter a task");
            return;
        }

        const taskObject = {
            label: newTask,
            done: false,
        };

        try {
            
            const response = await fetch(URL + userName);
            const data = await response.json();
            const updatedTasks = [...data, taskObject];

            
            const putResponse = await fetch(URL + userName, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTasks),
            });

            if (!putResponse.ok) throw new Error("Failed to update tasks");

            
            getTodos();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

}

export default Fetching;
