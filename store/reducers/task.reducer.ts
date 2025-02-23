import { Task } from "@/interfaces/Task/ticket.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [action.payload, ...(state.tasks || [])];
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks?.findIndex(
        (props) => props.id === action?.payload.id
      );
      const newData = [...(state.tasks || [])];

      console.log(index);

      if (index) {
        newData[index] = action.payload;

        state.tasks = newData;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = (state.tasks || [])?.filter(
        (props) => props.id !== action.payload
      );
    },
    setInitialState: () => {
      return initialState;
    },
  },
});

export const { addTask, deleteTask, editTask, setTasks, setInitialState } =
  TaskSlice.actions;

export default TaskSlice.reducer;
