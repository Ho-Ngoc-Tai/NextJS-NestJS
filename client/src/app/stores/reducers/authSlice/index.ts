import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  user: { id: string; email: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; user: { id: string; email: string } }>
    ) => {
      state.loading = false;
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

const selectAuthState = (state: { auth: AuthState }) => state.auth;

export const makeSelectAuthData = createSelector(
  [selectAuthState],
  (auth: AuthState) => ({
    token: auth.token,
    account: auth.user,
  })
);

export const makeSelectAuthLoading = createSelector(
  [selectAuthState],
  (auth: AuthState) => auth.loading
);

export const makeSelectAuthError = createSelector(
  [selectAuthState],
  (auth: AuthState) => auth.error
);

export const makeSelectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth: AuthState) => !!auth.token
);

export const makeSelectAuthUser = createSelector(
  [selectAuthState],
  (auth: AuthState) => auth.user
);