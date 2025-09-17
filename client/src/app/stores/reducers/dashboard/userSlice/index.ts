import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface UserState {
  users: User[];       // đổi từ profile -> users (mảng)
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
});

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, clearUsers } =
  userSlice.actions;
export default userSlice.reducer;

// --- SELECTORS ---
const selectUserState = (state: { user: UserState }) => state.user;

export const selectUsers = createSelector([selectUserState], (user) => user.users);
export const selectUserLoading = createSelector([selectUserState], (user) => user.loading);
export const selectUserError = createSelector([selectUserState], (user) => user.error);
