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

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "idle";
      state.error = null;
      state.data = { user: null, jwtToken: null };
    },
    clearRequest: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(login.rejected, (state, action) => {
        const error = action.meta.requestStatus;
        state.status = "rejected";

        if (error === "rejected") {
          state.error =
            "Sorry, there was an error with the request. Try again later or contact the administrator";
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        const { jwtToken, user } = action.payload;
        state.status = "fulfilled";
        state.error = null;
        state.data = {
          jwtToken,
          user,
        };
      });
  },
});

export default userSlice.reducer;
export const { logout, clearRequest } = userSlice.actions;

//selectors
export const selectJwtToken = (state) => state.user.data.jwtToken;
export const selectUserData = (state) => state.user.data.user;
export const selectLoginStatus = (state) => {
  return { status: state.user.status, error: state.user.error };
};
