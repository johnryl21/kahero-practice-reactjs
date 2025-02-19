import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask } from "../redux/todoSlice";

const TodoList = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ id: Date.now(), text: task }));
      setTask("");
    }
  };

  return (
    <div className="container mt-4">
      <h2>To-Do List</h2>
      <input
        type="text"
        className="form-control"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button className="btn btn-primary mt-2" onClick={handleAddTask}>
        Add Task
      </button>
      <ul className="list-group mt-3">
        {tasks.map((t) => (
          <li key={t.id} className="list-group-item d-flex justify-content-between">
            {t.text}
            <button className="btn btn-danger btn-sm" onClick={() => dispatch(removeTask(t.id))}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
