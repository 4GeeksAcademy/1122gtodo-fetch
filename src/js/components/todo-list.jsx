import React, { useEffect, useState } from "react";
const userName = "1122gs";
import Fetching from "./fetching ";

const URL = "https://playground.4geeks.com/todo/";

function Todo() {
  const [taskList, setTaskList] = useState(["clean room", "Eat Breakfast"]);
  const [newTask, setNewTask] = useState("");
  const taskLeft = taskList.length;

  useEffect(() => {
    fetch(URL + "users/" + userName)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.todos)) {
          setTaskList(data.todos);
        } else {
          console.error("Unexpected response:", data);
          setTaskList([]);
        }
      })
      .catch((error) => console.error("Error fetching tasks:", error));
    setTaskList;
    [];
  }, []);

  function add() {
    if (newTask.trim() === "") {
      alert("Please add a task");
      return;
    }

    const taskObject = { label: newTask, done: false };

    fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskObject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add new task");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task was added successfully:", data);

        // Update local state
        setTaskList([...taskList, taskObject]);
        setNewTask("");
      })
      .catch((error) => console.error(error.message));
  }

  // function add() {
  //   if (newTask.trim() !== "") {
  //     alert("Please add a task");
  //     const taskObject = { label: newTask, done: false};
  //   }

  //   //update local state
  //   setTaskList([...taskList, newTask]);
  //   setNewTask("");

  //   fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(taskObject),
  //   })

  //   if (!response.ok) {
  //     setErrorMessage("Failed to add new task")
  //     return;
  //   }

  //   const data = await response.json();
  //   console.log("Task was added successfully: ", data)

  // .then((response) => response.json())
  // .then(existingTasks => {
  //     if (!Array.isArray(existingTasks)) existingTasks = [];

  // const updatedTasks = [...existingTasks, taskObject];

  // return fetch(`https://playground.4geeks.com/todos/${userName}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updatedTasks),
  // });
  // })
  // .then((response) => {
  //   if (!response.ok) throw new Error("Failed to update tasks");
  //   return response.json();
  // })
  // .then(() => {
  //     return fetch(`https://playground.4geeks.com/todo/${userName}`);
  // })

  // .then((updatedTasks) => {
  //   setTaskList(updatedTasks);
  //   setNewTask("");
  // })
  // .catch((error) => console.error("Error adding task:", error));
  // }

  function deleted(index) {
    setTaskList(taskList.filter((_, i) => i !== index));
    fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTasks),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete task");
        return response.json();
      })
      .then(() => setTaskList(updatedTasks))
      .catch((error) => console.error("Error deleting task:", error));
  }

  async function deleteAllTasks() {
    await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete tasks");
        return response.json();
      })

      .then(() => {
        setTaskList([]);
        alert("All tasks deleted successfully!");
      })
      .catch((error) => console.error("Error deleting tasks:", error));

    //creating your user again with an empty todo list
    fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Failed to recreate user");
          return response.json();
        }
      })
      .then(() => {
        setTaskList([]);
        console.log("All tasks deleted successfully");
      })
      .catch((error) => console.error("Error deleting tasks:", error));
  }

  return (
    <div>
      <Fetching />
      <div className="todoInput">
        <input
          type="text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
          placeholder="What needs to be done"
        />
        <button className="btn addButton" onClick={add}>
          Add
        </button>

        <div className="taskToDo">
          <ul className="taskUl">
            {taskList.map((task, index) => (
              <li key={index}>
                <p>
                  {task.label}
                  <button className="close" onClick={() => deleted(index)}>
                    x
                  </button>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="todoFooter">
          <p>
            {taskLeft} task{taskLeft !== 1 ? "s" : " "} left
          </p>{" "}
          <button onClick={() => deleteAllTasks()}>delete all</button>
        </div>
      </div>
    </div>
  );
}
export default Todo;
