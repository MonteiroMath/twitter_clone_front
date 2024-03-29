import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";
import setJwtHeader from "./utils/setJwtHeader";

const initialState = {
  status: "idle",
  error: null,
  data: [],
};

export const fetchAnswers = createAsyncThunk("page/fetch", async (params) => {
  const { parentId, username, jwtToken } = params;

  const data = await client.get(
    `/tweets/${parentId}/answers?username=${username}`,
    setJwtHeader(jwtToken)
  );
  return data;
});

export const postAnswer = createAsyncThunk(
  "page/postAnswer",
  async (params) => {
    const { userId, newTweet, parentId, jwtToken } = params;
    const { tweet, tweetContent, updatedTweet } = await client.post(
      `/tweets/${parentId}/answers/`,
      {
        userId,
        newTweet,
      },
      setJwtHeader(jwtToken)
    );

    return { tweet, tweetContent, updatedTweet };
  }
);

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    closePage(state, action) {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAnswers.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        if (action.payload.success) {
          state.data = action.payload.tweets;
        }
      })
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(postAnswer.fulfilled, (state, action) => {
        const { tweet } = action.payload;
        state.data.unshift(tweet);
      });
  },
});

//reducer
export default pageSlice.reducer;

//actions
export const { closePage } = pageSlice.actions;

//selectors
export const selectAnswers = (state) => state.page.data;
