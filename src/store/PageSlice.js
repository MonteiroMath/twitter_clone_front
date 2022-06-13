import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const initialState = {
  status: "idle",
  error: null,
  data: [],
};

export const fetchAnswers = createAsyncThunk("page/fetch", async (parentId) => {
  const data = await client.get(`/tweets/answers/${parentId}`);
  return data;
});

const pageSlice = createSlice({
  name: "page",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchAnswers.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.status = "fullfiled";
        if (action.payload.success) {
          state.data = action.payload.tweets;
        }
      })
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

//reducer
export default pageSlice.reducer;

//actions
export const actions = pageSlice.actions;

//selectors
export const selectAnswers = (state) => state.page.data;
