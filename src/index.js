import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";
import { nanoid } from "nanoid";

const store = initiateStore();

const App = (params) => {
  const [state, setState] = useState(store.getState());
  const [ task, setTask] = useState("");

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };
  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };
  const addTask = (task) => {    
    store.dispatch(actions.taskAdded(task));
  };
  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId));    
  };
  const handleCreateTask = (e) => {    
    setTask(e.target.value)
  }
  const handleAddTask = () => {
    const newTask = { id: nanoid(), title: task, completed: false }
    setTask("")
    return newTask
  }
console.log(task)
  return (
    <>
      <h1> App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p> {`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete</button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => deleteTask(el.id)}>Delete task</button>
            <hr />
          </li>
        ))}
      </ul>  
      <input type="text" name="task" value={task} placeholder="Введите задачу" onChange={handleCreateTask}/>    
      <button
        onClick={() => addTask(handleAddTask())}
      >
        Add task
      </button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
