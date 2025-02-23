import { Task } from "@/interfaces/Task/ticket.interface";
import { createSlice } from "@reduxjs/toolkit";

export interface TaskInitialState {
  tasks: Task[] | null;
}

const initialState: TaskInitialState = {
  tasks: null,
};

export const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks = [...(state.tasks || []), action.payload];
    },
    editTask: (state, action) => {
      state.tasks = [...(state.tasks || []), action.payload];
    },
    deleteTask: (state, action) => {
      state.tasks = [...(state.tasks || []), action.payload];
    },
    setInitialState: () => {
      return initialState;
    },
  },
});

export const { addTask, deleteTask, editTask, setTasks, setInitialState } =
  TaskSlice.actions;

export default TaskSlice.reducer;
