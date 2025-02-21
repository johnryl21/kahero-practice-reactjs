import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask, updateTask } from "../redux/todoSlice";
import { clearAllTasks } from "../redux/todoSlice"; // Import clearAllTasks action

const TodoList = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSelectAll(selectedTasks.length === tasks.length && tasks.length > 0);
  }, [selectedTasks, tasks]);

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = { id: Date.now(), text: task };
      dispatch(addTask(newTask));
      setTask("");
      setSelectedTasks((prevSelected) => [...prevSelected, newTask.id]);
    }
  };

  const handleToggleTask = (taskId) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(taskId)
        ? prevSelected.filter((id) => id !== taskId)
        : [...prevSelected, taskId]
    );
  };

  const handleDeleteSelected = () => {
    selectedTasks.forEach((id) => dispatch(removeTask(id)));
    setSelectedTasks([]);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map((task) => task.id));
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const handleUpdateTask = (taskId) => {
    if (editingText.trim()) {
      dispatch(updateTask({ id: taskId, text: editingText }));
      setEditingTaskId(null);
      setEditingText("");
    }
  };

  const handleDeleteAll = () => {
    dispatch(clearAllTasks()); // Dispatch action to remove all tasks
    setSelectedTasks([]);
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
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <div>
            <input
              type="checkbox"
              className="form-check-input me-2"
              onChange={handleSelectAll}
              checked={selectAll}
            />
            <label>Select All</label>
          </div>
          {tasks.length > 0 && (
            <button className="btn btn-danger btn-sm" onClick={handleDeleteAll}>
              Delete All
            </button>
          )}
        </div>
        {selectedTasks.length > 0 && (
          <button className="btn btn-warning btn-sm mt-2" onClick={handleDeleteSelected}>
            Delete Selected
          </button>
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
                {editingTaskId === t.id ? (
                  <>
                    <input
                      type="text"
                      className="form-control d-inline w-50 me-2"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      autoFocus
                    />
                    <button className="btn btn-success btn-sm" onClick={() => handleUpdateTask(t.id)}>✔</button>
                  </>
                ) : (
                  <span>{t.text}</span>
                )}
              </div>
              <div>
                {editingTaskId !== t.id && (
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditTask(t)}>✎</button>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => dispatch(removeTask(t.id))}>X</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
