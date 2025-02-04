import { useEffect, useState } from "react";
import React from "react";
import Todo from "./todo-list";

const userName = "ll22gs"
const URL = "https://playground.4geeks.com/todo/"

function Fetching(){
useEffect(() => {
  createUser();
}, []);

// 1. create the new user in the server using a POST method
const createUser = async () => {
  try{
    const response = await fetch(URL + "users/" + userName, {method: "POST"});
    if (!response.ok) {
      if (response.status == 400) {
        console.log("User already exists")
        getTodos();
        return;
      } else {
        console.log("adding new user failed")
      }
    }
  } catch (error) {
    console.error("Error creating user", error);

  }
}
const getTodos = async () => {
    try {
        const response = await fetch(URL + "todos/" + userName);
        if (!response.ok) throw new Error("Failed to fetch tasks");

        const data = await response.json();
        setTaskList(data.todos);  
    } catch (error) {
        console.error("No task found", error);
    }
};

// const getTodos = async () => {
//     await fetch(URL + "todo/" + userName)
// .then( response => {
//     if(response.status == 400)
//     {
//         createUser()
//     }
//     return response.json
// })
// .then(data => {
//     data.todo.for
// }

        
//      .catch (error) { console.error("No task found")
        
//     }
// }
}
    


export default Fetching