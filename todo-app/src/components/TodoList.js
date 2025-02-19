import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask } from "../redux/todoSlice";

const TodoList = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ id: Date.now(), text: task }));
      setTask("");
    }
  };

  const handleToggleTask = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleDeleteSelected = () => {
    selectedTasks.forEach((id) => dispatch(removeTask(id)));
    setSelectedTasks([]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTasks(tasks.map((task) => task.id));
    } else {
      setSelectedTasks([]);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-3">Candelon To-Do List</h2>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
          />
          <button className="btn btn-primary" onClick={handleAddTask}>
            Add
          </button>
        </div>
        
        {tasks.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                onChange={handleSelectAll}
                checked={selectedTasks.length === tasks.length && tasks.length > 0}
              />
              <label>Select All</label>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={handleDeleteSelected}
              disabled={selectedTasks.length === 0}
            >
              Delete Selected
            </button>
          </div>
        )}

        <ul className="list-group mt-3">
          {tasks.map((t) => (
            <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  onChange={() => handleToggleTask(t.id)}
                  checked={selectedTasks.includes(t.id)}
                />
                {t.text}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => dispatch(removeTask(t.id))}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
