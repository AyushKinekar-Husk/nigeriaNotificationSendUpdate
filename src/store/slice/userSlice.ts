// store/slice/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  name: string;
  userData: Record<string, any>;
  userDetails: Record<string, any>;
}

const initialState: UserState = {
  email: "",
  name: "",
  userData: {},
  userDetails: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<UserState>>) {
      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }
      if (action.payload.name !== undefined) {
        state.name = action.payload.name;
      }
      if (action.payload.userData !== undefined) {
        state.userData = action.payload.userData;
      }
      if (action.payload.userDetails !== undefined) {
        state.userDetails = action.payload.userDetails;
      }
    },
    clearUser(state) {
      state.email = "";
      state.name = "";
      state.userData = {};
      state.userDetails = {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
