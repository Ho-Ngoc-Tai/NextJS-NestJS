import { loginApi } from '@/app/lib/authApi';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'


export interface AuthState {
  token: string | null
  user: { id: string; email: string } | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload)
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.user = null
    },
    setUser(state, action: PayloadAction<{ id: string; email: string }>) {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.accessToken
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload || 'Login failed'
      })
  }
})

export const { logout, setUser } = authSlice.actions
export default authSlice.reducer
