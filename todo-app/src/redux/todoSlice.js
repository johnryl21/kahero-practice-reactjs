import { createSlice } from "@reduxjs/toolkit";
import { saveTasks, loadTasks } from "../core/services/TodoService";

const initialState = {
  tasks: loadTasks(),
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveTasks(state.tasks);
    },
    updateTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
        saveTasks(state.tasks);
      }
    },
    clearAllTasks: (state) => {
      state.tasks = []; // Remove all tasks
      saveTasks(state.tasks);
    },
  },
});

export const { addTask, removeTask, updateTask, clearAllTasks } = todoSlice.actions;
export default todoSlice.reducer;
