import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";
import { loadUserState } from "./utils/localStorageController";

const localUserState = loadUserState();

const initialState = {
  status: "idle",
  error: null,
  data: localUserState ? localUserState : { user: null, jwtToken: null },
};

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const data = await client.login(email, password);

    if (data.success) return data;
    else throw new Error(data);
  }
);

export const logout = createAsyncThunk("user/logout", async (jwtToken) => {
  const data = await client.logout(jwtToken);
  return data;
});

const userSlice = createSlice({
  name: "User",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.msg;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { jwtToken, userId } = action.payload;
        state.status = "fulfilled";
        state.error = null;
        state.data = {
          jwtToken,
          user: userId,
        };
      })
      .addCase(logout.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.msg;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.data = { user: null, jwtToken: null };
      });
  },
});

export default userSlice.reducer;
export const actions = userSlice.actions;

//selectors
export const selectJwtToken = (state) => state.user.data.jwtToken;
export const selectUserData = (state) => state.user.data.user;
