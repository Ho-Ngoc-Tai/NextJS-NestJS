import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/stores";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
}

export interface UserState {
  users: User[];
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
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const idx = state.users.findIndex((u) => u.id === action.payload.id);
      if (idx >= 0) state.users[idx] = action.payload;
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUser,
  updateUser,
  removeUser,
  clearUsers,
} = userSlice.actions;

export default userSlice.reducer;

// --- SELECTORS ---
const selectUserState = (state: RootState): UserState =>
  state.dashboard.user;

export const selectUsers = createSelector(
  [selectUserState],
  (user) => user.users
);

export const selectUserLoading = createSelector(
  [selectUserState],
  (user) => user.loading
);

export const selectUserError = createSelector(
  [selectUserState],
  (user) => user.error
);
