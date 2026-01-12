import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  isLoggedIn: boolean
  role: "superadmin" | "admin" | "employee" | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  role: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<AuthState["role"]>) {
      state.isLoggedIn = true
      state.role = action.payload
    },
    logout(state) {
      state.isLoggedIn = false
      state.role = null
    }
  }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
