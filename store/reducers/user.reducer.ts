import { createSlice } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

export interface UserInitialState {
  user: User | null;
}

const initialState: UserInitialState = {
  user: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setInitialStateUser: () => {
      return initialState;
    },
  },
});

export const { setUser, setInitialStateUser } = UserSlice.actions;

export default UserSlice.reducer;
