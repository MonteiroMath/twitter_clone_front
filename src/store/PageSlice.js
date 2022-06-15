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

export const postAnswer = createAsyncThunk(
  "page/postAnswer",
  async (params) => {
    const { userId, newTweet, parentId } = params;
    const { tweet, tweetContent } = await client.post("/tweets", {
      userId,
      newTweet,
      parentId,
    });

    return { tweet, tweetContent };
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
        state.status = "fullfiled";
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
