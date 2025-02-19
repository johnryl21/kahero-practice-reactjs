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
  },
});

export const { addTask, removeTask } = todoSlice.actions;
export default todoSlice.reducer;
