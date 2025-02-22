import { createSlice } from "@reduxjs/toolkit";

export interface TaskInitialState {
  tasks: null;
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
    setInitialState: () => {
      return initialState;
    },
  },
});
