import React, { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";

function App() {
  const [activeScreen, setActiveScreen] = useState(1);
  const activateTab = (index) => {
    setActiveScreen(index);
  };

  const [allTasks, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completedTasks, setCompleteTasks] = useState([]);
  const [incompletedTasks, setIncompleteTasks] = useState([]);

  {
    /* --------------------ALL TASKS TAB METHODS--------------------- */
  }

  const handleAddTask = () => {
    let newTaskItem = {
      task: newTask,
    };

    let updatedTaskArr = [...allTasks];
    updatedTaskArr.push(newTaskItem);
    setTodos(updatedTaskArr);

    localStorage.setItem("todolist", JSON.stringify(updatedTaskArr));
  };

  const handleDeleteTask = (index) => {
    let reduceTasks = [...allTasks];
    reduceTasks.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reduceTasks));

    setTodos(reduceTasks);
  };

  {
    /* --------------------COMPLETED TASKS TAB METHODS--------------------- */
  }

  const handleCompleteTask = (index) => {
    let completedItem = {
      ...allTasks[index],
    };

    let updatedCompletedArr = [...completedTasks];
    updatedCompletedArr.push(completedItem);
    setCompleteTasks(updatedCompletedArr);
    handleDeleteTask(index);
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTask = (index) => {
    let reduceTasks = [...completedTasks];
    reduceTasks.splice(index, 1);

    localStorage.setItem("completedTasks", JSON.stringify(reduceTasks));

    setCompleteTasks(reduceTasks);
  };

  {
    /* --------------------INCOMPLETE TASKS TAB METHODS--------------------- */
  }

  useEffect(() => {
    let savedAllTasks = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTasks = JSON.parse(
      localStorage.getItem("completedTasks")
    );

    if (savedAllTasks) {
      setTodos(savedAllTasks);
    }

    if (savedCompletedTasks) {
      setCompleteTasks(savedCompletedTasks);
    }
  }, []);

  return (
    <div className="App">
      <div className="todo-wrapper">
        <h1 className="title">TODO LIST</h1>
        <div className="todo-input">
          <div className="todo-input-item">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done?"
            ></input>
          </div>

          <div className="todo-input-item">
            <button type="button" onClick={handleAddTask} className="addBtn">
              Add
            </button>
          </div>
        </div>

        <div className="tab-area">
          <button
            className={activeScreen === 1 ? "active-tab" : "tab"}
            onClick={() => activateTab(1)}
          >
            All
          </button>
          <button
            className={activeScreen === 2 ? "active-tab" : "tab"}
            onClick={() => activateTab(2)}
          >
            Complete
          </button>
          <button
            className={activeScreen === 3 ? "active-tab" : "tab"}
            onClick={() => activateTab(3)}
          >
            Incomplete
          </button>
        </div>
      </div>

      <div className="todo-list">
        {/* --------------------ALL TASKS SCREEN--------------------- */}
        {activeScreen === 1 &&
          allTasks.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.task}</h3>
                </div>

                <div className="icon-box">
                  <button
                    className="incomplete-checkbox"
                    onClick={() => handleCompleteTask(index)}
                  >
                    Incomplete
                  </button>
                  <AiOutlineDelete
                    className="delete-icon"
                    onClick={() => handleDeleteTask(index)}
                  />
                </div>
              </div>
            );
          })}

        {/* -------------COMPLETED TASKS SCREEN------------------------- */}
        {activeScreen === 2 &&
          completedTasks.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.task}</h3>
                </div>

                <div className="icon-box">
                  <button
                    className="incomplete-checkbox"
                    onClick={() => handleCompleteTask(index)}
                  >
                    Incomplete
                  </button>
                  <AiOutlineDelete
                    className="delete-icon"
                    onClick={() => handleDeleteCompletedTask(index)}
                  />
                </div>
              </div>
            );
          })}

        {/* -------------INCOMPLETED TASKS SCREEN------------------------- */}
        {activeScreen === 3 &&
          allTasks.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.task}</h3>
                </div>

                <div className="icon-box">
                  <button
                    className="incomplete-checkbox"
                    onClick={() => handleCompleteTask(index)}
                  >
                    Incomplete
                  </button>
                  <AiOutlineDelete
                    className="delete-icon"
                    onClick={() => handleDeleteCompletedTask(index)}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
