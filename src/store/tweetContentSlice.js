import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTweets,
  postTweet,
  addRetweet,
  removeRetweet,
  addComment,
} from "./tweetsSlice";
import { client } from "../api/client";

const initialState = {
  status: "idle",
  error: null,
  data: [],
};

function updateTweet(stateData, updatedTweet) {
  let index = stateData.findIndex((tweet) => tweet.id === updatedTweet.id);

  stateData[index] = updatedTweet;
}

export const updateLike = createAsyncThunk(
  "tweets/updateLike",
  async (params) => {
    const { id, userId, like } = params;
    const data = await client.put(`/tweets/${id}/likes`, { userId, like });

    return data.updatedTweet;
  }
);

const tweetContentSlice = createSlice({
  name: "tweetContent",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchTweets.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.status = "fullfiled";
        if (action.payload.success) {
          state.data = action.payload.tweetContent;
        }
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(postTweet.fulfilled, (state, action) => {
        const { tweetContent } = action.payload;
        state.data.push(tweetContent);
      })
      .addCase(updateLike.fulfilled, (state, action) => {
        let updatedTweet = action.payload;

        updateTweet(state.data, updatedTweet);
      })
      .addCase(addRetweet.fulfilled, (state, action) => {
        let { tweetContent } = action.payload;

        updateTweet(state.data, tweetContent);
      })
      .addCase(removeRetweet.fulfilled, (state, action) => {
        const { updatedTweet } = action.payload;

        updateTweet(state.data, updatedTweet);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { updatedTweet } = action.payload;

        updateTweet(state.data, updatedTweet);
      });
  },
});

//reducer
export default tweetContentSlice.reducer;
//actions
export const actions = tweetContentSlice.actions;

//selectors
export const selectTweetContent = (state, contentId) =>
  state.tweetContent.data.find((tweetContent) => tweetContent.id === contentId);
